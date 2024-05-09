import { Router } from "express";

//import productsManager from "../../data/fs/ProductsManager.fs.js";
import productsManager from "../../data/mongo/managers/ProductsManager.mongo.js";
import uploader from "../../middlewares/multer.mid.js";
import isPhoto from "../../middlewares/isPhoto.js";
import isPropAndDefault from "../../middlewares/isPropAndDefault.js";

const productsRouter = Router();

productsRouter.get("/", read);
productsRouter.get("/paginate", paginate);
productsRouter.get("/product/:pid", readOne);
productsRouter.post(
  "/",
  uploader.single("photo"),
  isPhoto,
  isPropAndDefault,
  create
);
productsRouter.put("/:pid", update);
productsRouter.delete("/:pid", destroy);

async function read(req, res, next) {
  try {
    const { category } = req.query;
    let all;

    if (category) {
      // Si se proporciona una categoría, filtrar por esa categoría
      all = await productsManager.read({ category });
      console.log(all);

    } else {
      // Si no se proporciona ninguna categoría, obtener todos los productos
      all = await productsManager.read();
    }

    if (all.length > 0) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      const error = new Error("Not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function paginate(req, res, next) {
  try {
    const filter = {};
    const opts = {};

    if (req.query.limit) {
      opts.limit = req.query.limit;
    }
    if (req.query.page) {
      opts.page = req.query.page;
    }
    if (req.query.user_id) {
      filter.user_id = req.query.user_id;
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const all = await productsManager.paginate({ filter, opts });

    const finalPages = [];

    for (let i = 0; i < all.totalPages; i += 1) {
      finalPages.push(i + 1);
    }

    return res.json({
      statusCode: 200,
      response: all.docs,
      info: {
        page: all.page,
        totalPage: finalPages,
        limit: all.limit,
        prevPage: all.prevPage,
        nextPage: all.nextPage,
      },
    });
  } catch (error) {
    return next(error);
  }
}
async function readOne(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await productsManager.readOne(pid);
    if (one) {
      return res.json({
        statusCode: 200,
        response: one,
        success: true,
      });
    } else {
      const error = new Error("NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}
async function create(req, res, next) {
  try {
    const data = req.body;
    //console.log(req.file);
    //console.log(req.body);
    const one = await productsManager.create(data);
    return res.json({
      statusCode: 201,
      response: one.id,
      message: "CREATED ID. " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}
async function update(req, res, next) {
  try {
    const { pid } = req.params;
    const data = req.body;
    const one = await productsManager.update(pid, data);
    return res.json({
      statusCode: 200,
      message: one,
    });
  } catch (error) {
    return next(error);
  }
}
async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await productsManager.destroy(pid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}
export default productsRouter;
