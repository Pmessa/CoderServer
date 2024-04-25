import { Router } from "express";
import usersRouter from "./users.view.js";
import productsRouter from "./products.view.js";
import productsManager from "../../data/fs/ProductsManager.fs.js";
import cartsRouter from "../api/carts.api.js";

const viewsRouter = Router();

viewsRouter.use("/carts", cartsRouter)
viewsRouter.use("/users",usersRouter);
viewsRouter.use("/products/real",productsRouter);
/* viewsRouter.get("/", (req, res, next)=>{
    try {
        return res.render("index", { title: "HOME"})
        
    } catch (error) {
        return next(error);
        
    }
}) */
viewsRouter.get("/", async(req, res, next)=>{
    try {
        const products = await productsManager.read();
        return res.render("index", {products})
    } catch (error) {
       return next(error)
    }
})


export default viewsRouter;