import { Router } from "express";
//import productsManager from "../../dao/mongo/managers/ProductsManager.mongo.js";
//import productsManager from "../../dao/fs/ProductsManager.fs.js";
import CustomRouter from "../CustomRouter.js";
//import dao from "../../dao/dao.factory.js"
import productsRepository from "../../repositories/products.rep.js";
import environment from "../../utils/env.util.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import errorHandler from "../../middlewares/errorHandler.mid.js";
//const { products } = dao;
class ProductsRouter extends CustomRouter {
  init() {
    this.read("/paginate", ["PUBLIC", "USER"], read_paginate);
    this.read("/me", ["PUBLIC", "USER", "PREM"], read_paginate);
    this.read("/register", ["PUBLIC", "USER", "PREM"], registerProducts);
    this.read("/update/:pid", ["PUBLIC", "USER", "PREM"], updateProducts);
    this.read("/:pid", ["PUBLIC", "USER", "PREM"], read_one);
    this.read("/category/:category", ["PUBLIC", "USER"], read_category);
  }
}
/* async function readProducts(req,res, next) {
  
  try {
    const products = await productsRepository.read();
    return res.render("products", { products });
  } catch (error) {
    return next(error);
  }
}; */
async function registerProducts(req, res, next) {
  try {
    //console.log(req.user._id.toString())
    return res.render("products", {
      user_id: req.user._id.toString(),
    });
  } catch (error) {
    next(error);
  }
}
async function updateProducts(req, res, next) {
  try {
    const result = await productsRepository.readOneRepository(req.params.pid);
    //console.log(result)
    return res.render("updateProducts", {
      user_id: req.user._id.toString(),
      pid: req.params.pid,
      title: result.title,
      photo: result.photo,
      category: result.category,
      stock: result.stock,
      price: result.price,
    });
  } catch (error) {
    next(error);
  }
}

async function read_one(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await productsRepository.readOneRepository(pid);

    if (req.user) {
      const user_id = req.user._id;
      const isOwner =
        user_id == one.supplier_id.toString() || req.user.role == 1;
      //console.log(isOwner)
      return res.render("productDetail", {
        product: one,
        user_id: user_id,
        isOwner: isOwner,
      });
    } else {
      return res.render("productDetail", {
        product: one,
      });
    }
  } catch (error) {
    return next(error);
  }
}

async function read_paginate(req, res, next) {
  try {
    const { page, limit } = req.query;
    let supplier_id = null;
    req.user ? (supplier_id = req.user._id) : req.query.supplier_id.toString();

    //console.log(supplier_id)
    const response = await fetch(
      `${environment.HOST}${environment.PORT && ":"+environment.PORT}/api/products${
        req.path
      }?limit=${limit}&page=${page}&supplier=${supplier_id}`
    );
    console.log(response)
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const fetchedDocs = await response.json();

    //console.log(req.user)

    if (req.user) {
      const user_id = req.user._id;
      return res.render("index", {
        products: fetchedDocs.response,
        pagination: fetchedDocs.info.totalPage,
        limit: fetchedDocs.info.limit,
        nextPage: fetchedDocs.info.nextPage,
        prevPage: fetchedDocs.info.prevPage,
        url: "/products",
        user_id: user_id,
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
}

async function read_category(req, res, next) {
  try {
    const { category } = req.params;
    const response = await fetch(
      `${environment.HOST}${environment.PORT && ":"+environment.PORT}/api/products/paginate?category=${category}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const fetchedDocs = await response.json();
    if (req.user) {
      const user_id = req.user._id;
      return res.render("index", {
        products: fetchedDocs.response,
        pagination: fetchedDocs.info.totalPage,
        limit: fetchedDocs.info.limit,
        nextPage: fetchedDocs.info.nextPage,
        prevPage: fetchedDocs.info.prevPage,
        url: "/products",
        user_id: user_id,
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
}
const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
