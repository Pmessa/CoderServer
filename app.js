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
server.get("/api/products/:title/:category/:price", async (req, res) => {
  try {
    const { title, category, price } = req.params;
    //data es el objeto con cada producto
    const data = { title, category, price };
    const one = await productsManager.create(data);
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
server.get("/api/products", async (req, res) => {
  try {
    const { category } = req.query;
    const all = await productsManager.read(category);
    if (all.length !== 0) {
      return res.status(200).json({
        response: all,
        category,
        success: true,
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        response: null,
        message: "NO HAY PRODUCTOS CON LA CATEGORÍA CONSULTADA",
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      response: "Internal Server Error",
      success: false,
    });
  }
});

server.get("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.readOne(pid);
    if (one) {
      return res.status(200).json({
        response: one,
        success: true
      });
    } else {
      const error = new Error("NOT FOUND ID");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return res.status(error.statusCode).json({
      response: error.message,
      success: false
    });
  }
});
