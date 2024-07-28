//import { Router } from "express";
//import productsManager from "../../dao/fs/ProductsManager.fs.js";
//import productsManager from "../../dao/mongo/managers/ProductsManager.mongo.js";
import usersRouter from "./users.view.js";
import productsRouter from "./products.view.js";
import cartsRouter from "./carts.view.js";
import { paginate } from "mongoose-paginate-v2";
import CustomRouter from "../CustomRouter.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { readOne } from "../../controllers/users.controller.js";

//import productDetailRouter from "./product.detail.view.js";

    class IndexRouter extends CustomRouter{
      init(){
        this.use("/users", usersRouter);
        this.use("/carts", cartsRouter)
        this.use("/products/real", productsRouter);
        this.use("/:pid", productsRouter)

        this.read("/", ["PUBLIC","USER"], read_index)
      }
    }

async function read_index(req, res, next){
  try {
    const page = 1

    const limit = 25

    const response = await fetch(`http://localhost:8080/api/products/paginate?limit=${limit}&page=${page}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const fetchedDocs = await response.json();  
    if(req.user){
      const user_id = req.user._id
      return res.render("index", { products: fetchedDocs.response, pagination: fetchedDocs.info.totalPage, limit: fetchedDocs.info.limit, nextPage: fetchedDocs.info.nextPage, prevPage: fetchedDocs.info.prevPage, url: 'products/', user_id: user_id });
    } else {
      return res.render("index", { products: fetchedDocs.response, pagination: fetchedDocs.info.totalPage, limit: fetchedDocs.info.limit, nextPage: fetchedDocs.info.nextPage, prevPage: fetchedDocs.info.prevPage, url: 'products/' });
    }
    } catch (error) {
    return next(error);
  }}


const indexRouter = new IndexRouter

export default indexRouter.getRouter();