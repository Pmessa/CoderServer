import { Router } from "express";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";
//import cartsManager from "../../data/fs/cartsManager.fs.js";
const cartsRouter = Router();

/* cartsRouter.get("/", async (req, res, next) => {
  try {
    const { user_id } = req.params
    const carts = await cartsManager.readCart(user_id);
    return res.render("cart", { cart: carts });
  } catch (error) {
    return next(error);
  }
});
 */cartsRouter.post("/:uid", async (req, res, next) => {
  try {
    const {product} = req.body
    const { uid } = req.params
    const result = await fetch("http:/localhost:8080/api/carts/", {method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({product_id: product})
    })
    const carts = await cartsManager.readCart(uid);
    return res.render("cart", { cart: carts });
  } catch (error) {
    return next(error);
  }
});
cartsRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params
    const carts = await cartsManager.readCart(uid);
    return res.render("cart", { cart: carts });
  } catch (error) {
    return next(error);
  }
});

export default cartsRouter;
