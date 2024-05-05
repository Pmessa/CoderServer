import { Router } from "express";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";
//import cartsManager from "../../data/fs/cartsManager.fs.js";
const cartsRouter = Router();

cartsRouter.get("/", async (_req, res, next) => {
  try {
    const user_id = '663009a33a3ecb3b9ad81b1a'
    const carts = await cartsManager.readCart(user_id);
    console.log(carts)
    return res.render("cart", { cart: carts });
  } catch (error) {
    return next(error);
  }
});

export default cartsRouter;
