// import { Router } from "express";
// import apiRouter from "./api/index.api.router.js";
// import viewsRouter from "./views/index.view.js"

// const indexRouter = Router();

// indexRouter.use("/api", apiRouter);
// indexRouter.use("/", viewsRouter);

// export default indexRouter;
import CustomRouter from "./CustomRouter.js";
import indexApiRouter from "./api/index.api.router.js";
import viewsRouter from "./views/index.view.js"


class IndexRouter extends CustomRouter{
    init(){
        this.use("/api", indexApiRouter)
        this.use("/", viewsRouter)
    }
}

const indexRouter = new IndexRouter()

export default indexRouter.getRouter()