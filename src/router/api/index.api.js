import { Router } from "express";
import productsRouter from "./products.api.js";
const apiRouter = Router()


apiRouter.use("/products", productsRouter)


export default apiRouter