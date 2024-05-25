import { Router } from "express";
import productsManager from "../../data/mongo/managers/ProductsManager.mongo.js";
//import productsManager from "../../data/fs/ProductsManager.fs.js";
const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await productsManager.read();
    if (req.session.user_id) {
      return res.render("products", { products, user_id: req.session.user_id });
    } else {
      return res.render("products", { products, user_id: req.session.user_id });
    }
  } catch (error) {
    return next(error);
  }
});


productsRouter.get("/paginate", async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const response = await fetch(
      `http://localhost:8080/api/products/paginate?limit=${limit}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const fetchedDocs = await response.json();
    
    if (req.session.user_id) {
      return res.render("index", {
        products: fetchedDocs.response,
        pagination: fetchedDocs.info.totalPage,
        limit: fetchedDocs.info.limit,
        nextPage: fetchedDocs.info.nextPage,
        prevPage: fetchedDocs.info.prevPage,
        url: "/products",
        user_id: req.session.user_id,
      });
    } else {
      return res.render("index", {
        products: fetchedDocs.response,
        pagination: fetchedDocs.info.totalPage,
        limit: fetchedDocs.info.limit,
        nextPage: fetchedDocs.info.nextPage,
        prevPage: fetchedDocs.info.prevPage,
        url: "/products",
        user_id: req.session.user_id,
      });
    }
  } catch (error) {
    return next(error);
  }
});
// productsRouter.get("/paginate", async (req, res, next) => {
//   try {
//     const { page, limit } = req.query;
//     const response = await fetch(
//       `http://localhost:8080/api/products/paginate?limit=${limit}&page=${page}`
//     );
//     if (!response.ok) {
//       throw new Error("Failed to fetch data");
//     }
//     const fetchedDocs = await response.json();
//     //console.log(fetchedDocs.info)
//     if (req.session.user_id) {
//       return res.render("index", {
//         products: fetchedDocs.response,
//         pagination: fetchedDocs.info.totalPage,
//         limit: fetchedDocs.info.limit,
//         nextPage: fetchedDocs.info.nextPage,
//         prevPage: fetchedDocs.info.prevPage,
//         url: "/products",
//         user_id: req.session.user_id,
//       });
//     } else {
//       return res.render("index", {
//         user_id: req.session.user_id,
//       });
//     }
//   } catch (error) {
//     return next(error);
//   }
// });

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productsManager.readOne(pid);
    //return res.render("productDetail", { product: one });
    if (req.session.user_id) {
      return res.render("productDetail", {
        product: one,
        user_id: req.session.user_id,
      });
    } else {
      return res.render("productDetail", {
        product: one,
        user_id: req.session.user_id,
      });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/category/:category", async (req, res, next) => {
  try {
    const { category } = req.params;
    const response = await fetch(
      `http://localhost:8080/api/products/paginate?category=${category}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const fetchedDocs = await response.json();
    if (req.session.user_id) {
      return res.render("index", {
        products: fetchedDocs.response,
        pagination: fetchedDocs.info.totalPage,
        limit: fetchedDocs.info.limit,
        nextPage: fetchedDocs.info.nextPage,
        prevPage: fetchedDocs.info.prevPage,
        url: "/products",
        user_id: req.session.user_id,
      });
    } else {
      return res.render("index", {
        products: fetchedDocs.response,
        pagination: fetchedDocs.info.totalPage,
        limit: fetchedDocs.info.limit,
        nextPage: fetchedDocs.info.nextPage,
        prevPage: fetchedDocs.info.prevPage,
        url: "/products",
      });
    }
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
