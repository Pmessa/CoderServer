import { expect } from "chai";
import supertest from "supertest";
import environment from "../../src/utils/env.util.js";
import usersRepository from "../../src/repositories/users.rep.js";
import productsRepository from "../../src/repositories/products.rep.js";

const requester = supertest(`http://localhost:${environment.PORT}/api`);

// PARA PODER USAR EL SUPERTEST Debe modificar en el dto en la propiedad verify agregar "data.verify || false".

describe("Testeando eVolución API", function () {
  this.timeout(20000);
  const user = {
    name: "TestingUser",
    email: "pablomessa@hotmail.com",
    password: "hola1234",
    role: 1,
    verify: true,
  };
  const product = {
    title: "Producto creado para test",
    stock: 5,
    price: 1250,
    supplier_id: "6682c7c751722d0acc73803c"
  };
  let token = "";
  it("Registro de un usuario", async () => {
    const response = await requester.post("/sessions/register").send(user);
    const { _body } = response;
    console.log(_body);
    expect(_body.statusCode).to.be.equals(201);
  });
  it("Inicio de sesión de un usuario admin", async () => {
    const response = await requester.post("/sessions/login").send(user);
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
    product._id = _body.message.split(': ')[1]
    //console.log(product._id)
    expect(_body.statusCode).to.be.equals(201);
  });
  it("Leemos el producto creado", async () => {
    const foundProduct = await productsRepository.readOneRepository(product._id);
    const response = await requester.get("/products/" + foundProduct._id);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });
  it("Actualización de un producto por parte del usuario", async () => {
    const foundProduct = await productsRepository.readOneRepository(product._id);;
    const response = await requester
      .put("/products/" + foundProduct._id)
      .send({
        title: "Producto de Prueba Testing Modificado",
      
      })
      .set("Cookie", token);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });

  

  
  
  
  
  
  
  
  
  
  
  
  /* it("Eliminación de un producto por parte del usuario admin", async () => {
    const foundProduct = await productsRepository.readByRepository({
      title: product.title,
    });
    const response = await requester
      .delete("/products/" + foundProduct._id)
      .set("Cookie", token);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });
  it("Cerrado de sesión", async () => {
    const response = await requester
      .post("/sessions/logout")
      .set("Cookie", token);
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  }); */
  /* it("Eliminación de un usuario", async () => {
    const email = user.email
    const foundUser = await usersRepository.readByEmailRepository(email);
    console.log(foundUser)
    const response = await requester.delete("/users/" + foundUser._id.toString()).set("Cookie", token);
    //console.log(response)
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  }); */
});
