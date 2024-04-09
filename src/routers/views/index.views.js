import { Router } from "express";
import productsManager from "../../data/fs/ProductsManager.fs.js";
import productsRouter from "./products.views.js";

const viewsRouter = Router();

viewsRouter.use("/products/real", productsRouter);
viewsRouter.get("/", async(req, res, next)=>{
    try {
        const products = await productsManager.read();
        return res.render("index", {products})
    } catch (error) {
       return next(error)
    }
})

export default viewsRouter;
