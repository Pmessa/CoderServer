import { Router } from "express";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";
//import cartsManager from "../../data/fs/cartsManager.fs.js";
const cartsRouter = Router();

cartsRouter.get("/", async (_req, res, next) => {
  try {
    let user_id = '663009a33a3ecb3b9ad81b1a'
    const carts = await cartsManager.readCart(user_id);
    return res.render("cart", { cart: carts });
  } catch (error) {
    return next(error);
  }
});
cartsRouter.post("/agregar", async (req, res, next) => {
  try {
    const {product} = req.body
    let user_id = '663009a33a3ecb3b9ad81b1a'
    const result = await fetch("http:/localhost:8080/api/carts/", {method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({product_id: product})
    })
    const carts = await cartsManager.readCart(user_id);
    return res.render("cart", { cart: carts });
  } catch (error) {
    return next(error);
  }
});

export default cartsRouter;
