import { Router } from "express";
import productsRouter from "./products.views.js";

const viewsRouter = Router();

viewsRouter.use("/products", productsRouter);
viewsRouter.get("/", (req, res, next)=>{
    try {
        return res.render("index", {title:"HOME"})
    } catch (error) {
        next(error)
    }
})

export default viewsRouter;
