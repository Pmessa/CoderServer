import CustomRouter from "../CustomRouter.js";
import usersRouter from "./users.api.js";
import productsRouter from "./products.api.js";
import cartsRouter from "./carts.api.js";
import sessionsRouter from "./sessions.api.js";
import ticketsRouter from "./tickets.api.js";
import loggersRouter from "./loggers.router.js";

class ApiRouter extends CustomRouter {
  init() {
    this.use("/users", usersRouter);
    this.use("/products", productsRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/carts", cartsRouter);
    this.use("/tickets", ticketsRouter);
    this.use("/loggers", loggersRouter);
  }
}

const indexApiRouter = new ApiRouter();
export default indexApiRouter.getRouter();
