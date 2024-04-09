import { Router } from "express";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {

    return res.render("products", { products });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
