import { Router } from "express";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";
//import cartsManager from "../../data/fs/cartsManager.fs.js";
import { verifyToken } from "../../utils/token.util.js";

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
 */ cartsRouter.post("/", async (req, res, next) => {
  try {
    let token = req.cookies.token
    token = verifyToken(token)
    console.log(token);
    const { product } = req.body;
    const user_id = token._id;
    console.log(user_id);
    const result = await fetch("http:/localhost:8080/api/carts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id: product, user_id: user_id }),
    });
    const carts = await cartsManager.readCart(user_id);
    //return res.render("cart", { cart: carts });
    if (user_id) {
      return res.render("cart", { cart: carts, user_id: user_id });
    } else {
      return res.render("cart", { cart: carts, user_id: user_id });
    }
  } catch (error) {
    return next(error);
  }
});
cartsRouter.get("/", async (req, res, next) => {
  try {
    const {_id } = req.cookies.token._id;
    
    const carts = await cartsManager.readCart(_id);
    if (req.session.user_id) {
      return res.render("cart", { cart: carts, user_id: _id });
    } else {
      return res.render("cart", { cart: carts, user_id: _id });
    }
  } catch (error) {
    return next(error);
  }
});

cartsRouter.delete("/all", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const result = await fetch("http://localhost:8080/api/carts/all", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user_id }),
    });
    return res.json({
      statusCode: 200,
    });
  } catch (error) {
    return next(error);
  }
});

export default cartsRouter;
