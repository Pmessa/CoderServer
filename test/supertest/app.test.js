import { expect } from "chai";
import supertest from "supertest";
import environment from "../../src/utils/env.util.js";
import usersRepository from "../../src/repositories/users.rep.js";

const requester = supertest(`http://localhost:${environment.PORT}/api`);

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
  it("Eliminación de un usuario", async () => {
    const email = user.email
    const foundUser = await usersRepository.readByEmailRepository(email);
    console.log(foundUser)
    const response = await requester.delete("/users/" + foundUser._id.toString()).set("Cookie", token);
    //console.log(response)
    const { _body } = response;
    expect(_body.statusCode).to.be.equals(200);
  });
});
