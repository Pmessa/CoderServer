import { expect } from "chai";
import supertest from "supertest";
import environment from "../../src/utils/env.util.js";
import usersRepository from "../../src/repositories/users.rep.js";
import productsRepository from "../../src/repositories/products.rep.js";
import cartsRepository from "../../src/repositories/carts.rep.js";

const requester = supertest(`${environment.HOST}:${environment.PORT}/api`);
// PARA PODER USAR EL SUPERTEST Debe modificar en el dto en la propiedad verify agregar "data.verify || false".

describe("Testeando eVolución API", function () {
  this.timeout(20000);
  const userAdmin = {
    name: "TestingUserAdmin",
    email: "pablomessa@hotmail.com",
    password: "hola1234",
    role: 1,
    verify: true,
  };
  const userComun = {
    name: "TestingUser",
    email: "sebas@hotmail.com",
    password: "123",
    role: 0,
    verify: true,
  };
  const product = {
    title: "Producto creado para test",
    stock: 5,
    price: 1250,
    supplier_id: "6682c7c751722d0acc73803c",
  };
  const productDelete = {
    title: "Producto creado para test y ser eliminado",
    stock: 5,
    price: 1250,
    supplier_id: "6682c7c751722d0acc73803c",
  };
  let token = "";
  it("Registro de un usuario", async () => {
    const response = await requester.post("/sessions/register").send(userAdmin);
    const { _body } = response;
    //console.log(_body);
    expect(_body.statusCode).to.be.equals(201);
  });
  it("Inicio de sesión de un usuario admin", async () => {
    const response = await requester.post("/sessions/login").send(userAdmin);
    const { _body, headers } = response;
    //console.log(_body);
    //console.log(headers);
    token = headers["set-cookie"][0].split(";")[0];
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Creación de un producto por un usuario admin", async () => {
    const response = await requester
      .post("/products")
      .send(product)
      .set("Cookie", token);
    const { _body } = response;
    //console.log(_body)
    product._id = _body.message.split(": ")[1];
    //console.log(product._id)
    expect(_body.statusCode).to.be.equals(201);
  });
  it("Leemos el producto creado", async () => {
    const foundProduct = await productsRepository.readOneRepository(
      product._id
    );
    const response = await requester.get("/products/" + foundProduct._id);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });
  it("Actualización de un producto por parte del usuario", async () => {
    const foundProduct = await productsRepository.readOneRepository(
      product._id
    );
    const response = await requester
      .put("/products/" + foundProduct._id)
      .send({
        title: "Producto de Prueba Testing Modificado",
      })
      .set("Cookie", token);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });
  it("Creación de un producto por un usuario admin, que luego eliminamos", async () => {
    const response = await requester
      .post("/products")
      .send(productDelete)
      .set("Cookie", token);
    const { _body } = response;
    //console.log(_body)
    productDelete._id = _body.message.split(": ")[1];
    //console.log(product._id)
    expect(_body.statusCode).to.be.equals(201);
  });

  it("Eliminación de un producto por parte del usuario admin", async () => {
    const foundProduct = await productsRepository.readRepository({
      title: productDelete.title,
    });
    const response = await requester
      .delete("/products/" + foundProduct[0]._id.toString())
      .set("Cookie", token);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Cerrado de sesión", async () => {
    const response = await requester
      .post("/sessions/signout")
      .set("Cookie", token);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });
  it("Eliminación de un usuario Admin", async () => {
    const email = userAdmin.email;
    const foundUser = await usersRepository.readByEmailRepository(email);
    const response = await requester
      .delete("/users/" + foundUser._id.toString())
      .set("Cookie", token);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });
  it("Registro de un usuario", async () => {
    const response = await requester.post("/sessions/register").send(userComun);
    const { _body } = response;
    //console.log(_body);
    expect(_body.statusCode).to.be.equals(201);
  });

  it("Inicio de sesión de un usuario común", async () => {
    const response = await requester.post("/sessions/login").send(userComun);
    const { _body, headers } = response;
    token = headers["set-cookie"][0].split(";")[0];
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Agregar un producto al carrito por parte del usuario", async () => {
    // Obtenemos el user_id desde el repositorio de usuarios.
    const foundUser = await usersRepository.readByEmailRepository(
      userComun.email
    );
    userComun._id = foundUser._id.toString();
    // Datos para agregar el producto al carrito.
    const cartData = {
      user_id: foundUser._id.toString(),
      product_id: product._id,
      token: token.split("=")[1],
    };

    // Hacemos la solicitud para agregar el producto al carrito.
    const response = await requester
      .post("/carts")
      .send(cartData)
      .set("Cookie", token);

    const { _body } = response;
    expect(_body.statusCode).to.be.equals(201);
  });

  it("Leemos el carrito del usuario.", async () => {
    const response = await requester
    .get("/carts/" + userComun._id)
    .set("Cookie", token);

    const { _body } = response;
    console.log(_body)
    expect(_body.statusCode).to.be.equals(200);
  });

  it("Actualización de un producto en el carrito", async () => {
    // Obtenemos el carrito del usuario
    const foundCart = await cartsRepository.readRepository({
      user_id: userComun._id,
    });
  
    // Asegúrate de que el carrito no esté vacío antes de proceder
    if (foundCart.length > 0) {
      const cartId = foundCart[0]._id.toString();
      const updatedQuantity = 3; // Nueva cantidad para el producto
  
      // Realiza la solicitud PUT para actualizar la cantidad del producto en el carrito
      const response = await requester
        .put(`/carts/${cartId}`)
        .send({ product_id: product._id, quantity: updatedQuantity })
        .set("Cookie", token);
  
      const { _body } = response;
      expect(_body.statusCode).to.be.equals(200);
    } 
  }); 

  it("Vaciar el carrito.", async () => {
    const response = await requester.delete("/carts/all").set("Cookie", token);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });
});