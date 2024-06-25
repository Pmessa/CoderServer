//import usersManager from "../dao/fs/UsersManager.fs.js";
//import productsManager from "../dao/fs/ProductsManager.fs.js";
import productsManager from "../dao/mongo/managers/ProductsManager.mongo.js";
import usersManager from "../dao/mongo/managers/UserManager.mongo.js";
import productsRepository from "../repositories/products.rep.js";

import usersRepository from "../repositories/users.rep.js";

export default async (socket) => {
  
  console.log(`Client id: ${socket.id}`)
  socket.emit("products", await productsRepository.readRepository())
  socket.on("createProduct", async data => {
    await productsRepository.createRepository(data)
    socket.emit("products", await productsRepository.readRepository())
  })
  socket.on("register", async data => {
    await usersRepository.createRepository(data);
    socket.emit("users", await usersRepository.readRepository());
  });

};

