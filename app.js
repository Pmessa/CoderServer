import express from "express";
import productsManager from "./data/fs/ProductsManager.fs.js";

//server
const server = express();
const port = 8080;
const ready = () => console.log("Server rady on port " + port);

server.listen(port, ready);

//Middlewares
server.use(express.urlencoded({ extended: true }));

//Router
server.get("/", async (requerimientos, respuesta) => {
  try {
    return respuesta.status(200).json({
      response: "CODER API",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return respuesta.status(500).json({
      response: "CODER API ERROR",
      success: false,
    });
  }
});

//un parámetro
server.get("/products/:title/:category/:price", async(req, res) => {
  try {
    const { title, category } = req.params;
    //data es el objeto con cada producto
    const data = { title, category} 
    const one = await productsManager.create(data)
    return res.status(201).json({
      response: one,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      response: "ERROR",
      success: false,
    });
  }
});
