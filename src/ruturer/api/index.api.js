import { Router } from "express";
import productsRouter from "./products.api";
const apiRouter = Router()

apiRouter.use("/products", productsRouter)


export default apiRouter