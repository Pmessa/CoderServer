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
 */

cartsRouter.post("/", async (req, res, next) => {
  try {
    let user_id = null;
    if (req.cookies.token) {
      const userOnline = await fetch(
        "http://localhost:8080/api/sessions/online",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Cookie: `token=${req.cookies.token}`,
          },
        }
      );
      const fetchedUser = await userOnline.json();
      user_id = fetchedUser.response._id;
      
      const { product } = req.body;
      const result = await fetch("http:/localhost:8080/api/carts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: product, user_id: user_id, token: req.cookies.token }),
      });
    }
    const carts = await cartsManager.readCart(user_id);
    const products = carts
    let productsFinal = []
    const productMap = products.reduce((acc, product) => {
      const productId = product.product_id._id;
      if (acc[productId]) {
        acc[productId].quantity += product.quantity;
      } else {
        acc[productId] = { ...product };
      }
      return acc;
    }, {});
    
    productsFinal = Object.values(productMap);
    if (req.cookies.token) {
      return res.render("cart", { cart: productsFinal, user_id: user_id });
    } else {
      return res.render("cart", { cart: productsFinal, user_id: user_id });
    }
  } catch (error) {
    return next(error);
  }
});
cartsRouter.get("/", async (req, res, next) => {
  try {
    let user_id = null;
    if (req.cookies.token) {
      const userOnline = await fetch(
        "http://localhost:8080/api/sessions/online",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Cookie: `token=${req.cookies.token}`,
          },
        }
      );
      const fetchedUser = await userOnline.json();
      user_id = fetchedUser.response._id;
    }
    const _id = user_id;

    const carts = await cartsManager.readCart(_id);
    const products = carts
    let productsFinal = []
    const productMap = products.reduce((acc, product) => {
      const productId = product.product_id._id;
      if (acc[productId]) {
        acc[productId].quantity += product.quantity;
      } else {
        acc[productId] = { ...product };
      }
      return acc;
    }, {});

    productsFinal = Object.values(productMap);

    if (req.cookies.token) {
      return res.render("cart", { cart: productsFinal, user_id: _id });
    } else {
      return res.render("cart", { cart: productsFinal, user_id: _id });
    }
  } catch (error) {
    return next(error);
  }
});

cartsRouter.delete("/all", async (req, res, next) => {
  try {
    let user_id = null;
    if (req.cookies.token) {
      const userOnline = await fetch(
        "http://localhost:8080/api/sessions/online",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Cookie: `token=${req.cookies.token}`,
          },
        }
      );
      const fetchedUser = await userOnline.json();
      user_id = fetchedUser.response._id;
    }
    const result = await fetch("http://localhost:8080/api/carts/all", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user_id, token: req.cookies.token }),
    });
    return res.json({
      statusCode: 200,
    });
  } catch (error) {
    return next(error);
  }
});

export default cartsRouter;
