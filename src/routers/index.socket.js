//import usersManager from "../dao/fs/UsersManager.fs.js";
//import productsManager from "../dao/fs/ProductsManager.fs.js";
import productsManager from "../dao/mongo/managers/ProductsManager.mongo.js";
import usersManager from "../dao/mongo/managers/UserManager.mongo.js";

export default async (socket) => {
  console.log(`Client id: ${socket.id}`)
  socket.emit("products", await productsManager.read())
  socket.on("createProduct", async data => {
    await productsManager.create(data)
    socket.emit("products", await productsManager.read())
  })
  socket.on("register", async data => {
    await usersManager.create(data);
    socket.emit("users", await usersManager.read());
  });

};

