import { Router } from "express";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";
//import cartsManager from "../../data/fs/cartsManager.fs.js";
const cartsRouter = Router();

cartsRouter.get("/", async (_req, res, next) => {
  try {
    const user_id = '6630d5c3a4d6d14a42a590b2'
    const carts = await cartsManager.readCart(user_id);
    console.log(carts)
    return res.render("cart", { cart: carts });
  } catch (error) {
    return next(error);
  }
});

export default cartsRouter;
