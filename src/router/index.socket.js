import productsManager from "../data/fs/ProductsManager.fs.js"

productsManager
  export default async (socket)=>{
   console.log(`Client id: ${socket.id}`)
   socket.emit("products", await productsManager.read())
   socket.on("createProduct", async data =>{
    await productsManager.create(data)
    socket.emit("products", await productsManager.read())
   })
  }