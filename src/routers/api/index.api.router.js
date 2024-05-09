import { Router } from "express";
import usersRouter from "./users.api.js";
import productsRouter from "./products.api.js";
import cookiesRouter from "./cookies.api.js";

const apiRouter = Router();

apiRouter.use("/users", usersRouter)
apiRouter.use("/products", productsRouter)
apiRouter.use("/cookie", cookiesRouter)

export default apiRouter

