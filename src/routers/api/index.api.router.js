import CustomRouter from "../CustomRouter.js";
import usersRouter from "./users.api.js";
import productsRouter from "./products.api.js";
<<<<<<< HEAD
import cookiesRouter from "./cookies.api.js";
import sessionsRouter from "./sessions.api.js";
import cartsRouter from "./carts.api.js";

const apiRouter = Router();

apiRouter.use("/users", usersRouter)
apiRouter.use("/products", productsRouter)
apiRouter.use("/cookie", cookiesRouter)
apiRouter.use("/sessions", sessionsRouter)
apiRouter.use("/carts", cartsRouter)


export default apiRouter
=======
import cartsRouter from "./carts.api.js";
import sessionsRouter from "./sessions.api.js";
import ticketsRouter from "./tickets.api.js";

class ApiRouter extends CustomRouter {
  init() {
    this.use("/users", usersRouter);
    this.use("/products", productsRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/carts", cartsRouter);
    this.use("/tickets", ticketsRouter)
  }
}
>>>>>>> aa038a20601ff7162db969c3223076642dc46e72

const indexApiRouter = new ApiRouter();
export default indexApiRouter.getRouter();
