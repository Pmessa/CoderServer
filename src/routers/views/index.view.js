//import { Router } from "express";
//import productsManager from "../../dao/fs/ProductsManager.fs.js";
//import productsManager from "../../dao/mongo/managers/ProductsManager.mongo.js";
import usersRouter from "./users.view.js";
import productsRouter from "./products.view.js";
import cartsRouter from "./carts.view.js";
import environment from "../../utils/env.util.js";
import { paginate } from "mongoose-paginate-v2";
import CustomRouter from "../CustomRouter.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { readOne } from "../../controllers/users.controller.js";


//import productDetailRouter from "./product.detail.view.js";

class IndexRouter extends CustomRouter {
  init() {
    this.use("/users", usersRouter);
    this.use("/carts", cartsRouter);
    this.use("/products/real", productsRouter);
    this.read("/thanks", ["USER","PREM"], thanks);
    this.use("/:pid", productsRouter);
    this.read("/", ["PUBLIC", "USER"], read_index);
  }
}
function getBaseURL() {
  // Verifica si el host es 'localhost', lo cual indica que estás en desarrollo
  if (process.env.HOST.includes('localhost')) {
    return `${process.env.HOST}:${process.env.PORT}`;
  } else {
    // En producción solo utiliza el host, ya que normalmente ya incluye el protocolo y no se necesita el puerto
    return `${process.env.HOST}`;
  }
}
async function thanks(req, res, next) {
  try {
    return res.render("thanks", { user: req.user, user_id: req.user._id });
  } catch (error) {
    return next(error);
  }
}
async function read_index(req, res, next) {
  try {
    const page = 1;
    const limit = 25;
    let supplier_id = null;
    let response = null;

    

    if (req.user && req.user.role == 2) {
      supplier_id = req.user._id;
      response = await fetch(
        `${environment.HOST}${environment.PORT && ":"+environment.PORT}/api/products/paginate?limit=${limit}&page=${page}&supplier=${supplier_id}`
      );
    } else {
      response = await fetch(
        `${environment.HOST}${environment.PORT && ":"+environment.PORT}/api/products/paginate?limit=${limit}&page=${page}`
      );
    }

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const fetchedDocs = await response.json();
    if (req.user) {
      const user_id = req.user._id;
      return res.render("index", {
        products: fetchedDocs.response,
        pagination: fetchedDocs.info.totalPage,
        limit: fetchedDocs.info.limit,
        nextPage: fetchedDocs.info.nextPage,
        prevPage: fetchedDocs.info.prevPage,
        url: "products/",
        user_id: user_id,
      });
    } else {
      return res.render("index", {
        products: fetchedDocs.response,
        pagination: fetchedDocs.info.totalPage,
        limit: fetchedDocs.info.limit,
        nextPage: fetchedDocs.info.nextPage,
        prevPage: fetchedDocs.info.prevPage,
        url: "products/",
      });
    }
  } catch (error) {
    return next(error);
  }
}

const indexRouter = new IndexRouter();

export default indexRouter.getRouter();