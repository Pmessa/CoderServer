import { Router } from "express";
import usersRouter from "./users.api.js";
import productsRouter from "./products.api.js";

const apiRouter = Router();

apiRouter.use("/users", usersRouter)
apiRouter.use("/products", productsRouter)

export default apiRouter
