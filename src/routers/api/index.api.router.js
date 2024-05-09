import { Router } from "express";
import usersRouter from "./users.api.js";
import productsRouter from "./products.api.js";
import cookiesRouter from "./cookies.api.js";
import cartsRouter from "./carts.api.js"
const apiRouter = Router();

apiRouter.use("/users", usersRouter)
apiRouter.use("/products", productsRouter)
apiRouter.use("/cookie", cookiesRouter)
apiRouter.use("/sessions", sessionsRouter)
apiRouter.use("/carts", cartsRouter)

export default apiRouter

