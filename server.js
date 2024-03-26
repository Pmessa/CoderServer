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
const create = async (req, res) => {
  try {
    const data = req.body;
    const one = await productsManager.create(data);
    return res.json({
      statusCode: 201,
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
      message: "UPDATED ID: " + one.id,
    });
  } catch (error) {
    return res.json({
      statusCode: error.statusCode || 500,
      message: error.message || "CODER API ERROR",
    });
  }
};
server.post("/api/products", create);
server.put("/api/products/:pid", update);
