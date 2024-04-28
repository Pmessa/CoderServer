import { Router } from "express";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";
//import cartsManager from "../../data/fs/cartsManager.fs.js";
const cartsRouter = Router();

cartsRouter.get("/", async (_req, res, next) => {
  try {
    const carts = await cartsManager.read();
    return res.render("carts", { carts });
  } catch (error) {
    return next(error);
  }
});

export default cartsRouter;
