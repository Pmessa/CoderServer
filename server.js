import express from "express";
import productsManager from "./src/data/fs/ProductsManager.fs.js";

const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);

//middleware
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//routes

server.get("/", async (req, res) => {
  try {
    return res.json({
      statusCode: 200,
      message: "CODER API OK",
    });
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: "CODER API ERROR",
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
      return res.json({
        statusCode:200,
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

const create = async (req, res) => {
  try {
    const data = req.body;
    const one = await productsManager.create(data);
    return res.json({
      statusCode: 201,
      response: one.id,
      message: "CREATED ID. " + one.id,
    });
  } catch (error) {
    return res.json({
      statusCode: error.statusCode || 500,
      message: error.message || "CODER API ERROR",
    });
  }
};

const update = async (req, res) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const one = await productsManager.update(pid, data);
    return res.json({
      statusCode: 200,
      message: one,
    });
  } catch (error) {
    return res.json({
      statusCode: error.statusCode || 500,
      message: error.message || "CODER API ERROR",
    });
  }
};

const destroy = async(req, res)=>{
  try {
    const {pid} = req.params
    const one = await productsManager.destroy(pid)
    return res.json({
      statusCode:200,
      response: one
    })
    
  } catch (error) {
    return res.json({
      statusCode: error.statusCode || 500,
      message: error.message || "CODER API ERROR",
    });
  }

}
server.post("/api/products", create);
server.put("/api/products/:pid", update);
server.delete("/api/products/:pid", destroy)
