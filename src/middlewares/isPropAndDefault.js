import crypto from "crypto";

function isPropAndDefault(req, res, next) {
  try {
    const { id, title, category, price, stock } = req.body;

    if (!id) {
      req.body.id = crypto.randomBytes(12).toString("hex");
    }

    if (!title) {
      const err = new Error("YOU MUST ENTER THE PRODUCT TITLE");
      err.statusCode = 400;
      throw err;
    }

    if (!category) {
      req.body.category = "Without category";
    }

    if (!price) {
      req.body.price = 1;
    }

    if (!stock) {
      req.body.stock = 1;
    }

    return next();
  } catch (error) {
    return next(error);
  }
}

export default isPropAndDefault;
