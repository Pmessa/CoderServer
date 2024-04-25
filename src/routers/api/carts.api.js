import { Router } from "express";

//import cartsManager from "../../data/fs/cartsManager.fs.js";
import cartsManager from "../../data/mongo/models/CartsManager.mongo.js";
import uploader from "../../middlewares/multer.mid.js";
import isPhoto from "../../middlewares/isPhoto.js";
import isPropAndDefault from "../../middlewares/isPropAndDefault.js";

const cartsRouter = Router();

cartsRouter.get("/", read);
cartsRouter.get("/:pid", readOne);
cartsRouter.post("/", uploader.single("photo"), isPhoto, isPropAndDefault, create);
cartsRouter.put("/:pid", update);
cartsRouter.delete("/:pid", destroy);

async function read(req, res, next) {
  try {
    const { category } = req.query;
    const all = await cartsManager.read(category);
    if (all.length > 0) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      const error = new Error("Not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}
async function readOne(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await cartsManager.readOne(pid);
    if (one) {
      return res.json({
        statusCode: 200,
        response: one,
        success: true,
      });
    } else {
      const error = new Error("NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}
async function create(req, res, next) {
  try {
    const data = req.body;
    console.log(req.file);
    console.log(req.body);
    const one = await cartsManager.create(data);
    return res.json({
      statusCode: 201,
      response: one.id,
      message: "CREATED ID. " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}
async function update(req, res, next) {
  try {
    const { pid } = req.params;
    const data = req.body;
    const one = await cartsManager.update(pid, data);
    return res.json({
      statusCode: 200,
      message: one,
    });
  } catch (error) {
    return next(error);
  }
}
async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await cartsManager.destroy(pid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}
export default cartsRouter;