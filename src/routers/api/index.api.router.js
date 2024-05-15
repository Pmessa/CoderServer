import { Router } from "express";
import usersRouter from "./users.api.js";
import productsRouter from "./products.api.js";
import cartsRouter from "./carts.api.js";
import cookiesRouter from "./cookies.api.js";
import sessionsRouter from "./sessions.api.js";

const apiRouter = Router();

apiRouter.use("/users", usersRouter)
apiRouter.use("/products", productsRouter)
apiRouter.use("/cookies", cookiesRouter)
apiRouter.use("/sessions", sessionsRouter)
apiRouter.use("/carts", cartsRouter)

export default apiRouter

