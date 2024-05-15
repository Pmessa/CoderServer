import { Router } from "express";
import usersRouter from "./users.api.js";
import productsRouter from "./products.api.js";
<<<<<<< HEAD
import cartsRouter from "./carts.api.js";
import cookiesRouter from "./cookies.api.js";
=======
import cookiesRouter from "./cookies.api.js";
import cartsRouter from "./carts.api.js"
import sessionsRouter from "./sessions.api.js";
>>>>>>> 1b27f727f3a68a1eac345913dec84498a2d27535

const apiRouter = Router();

apiRouter.use("/users", usersRouter)
apiRouter.use("/products", productsRouter)
<<<<<<< HEAD
apiRouter.use("carts", cartsRouter)
apiRouter.use("/cookies", cookiesRouter)
=======
apiRouter.use("/cookies", cookiesRouter)
apiRouter.use("/sessions", sessionsRouter)
apiRouter.use("/carts", cartsRouter)
>>>>>>> 1b27f727f3a68a1eac345913dec84498a2d27535

export default apiRouter

