//import usersManager from "../data/fs/UsersManager.fs.js";
//import productsManager from "../data/fs/ProductsManager.fs.js";
import productsManager from "../data/mongo/managers/ProductsManager.mongo.js";
import usersManager from "../data/mongo/managers/UserManager.mongo.js";

export default async (socket) => {
  console.log(`Client id: ${socket.id}`)
   socket.emit("products", await productsManager.read())
   socket.on("createProduct", async data =>{
    await productsManager.create(data)
    socket.emit("products", await productsManager.read())
   })
  socket.on("register", async data => {
    await usersManager.create(data);
    socket.emit("users", await usersManager.read());
  });
  
};

