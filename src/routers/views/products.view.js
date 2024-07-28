import { Router } from "express";
//import productsManager from "../../dao/mongo/managers/ProductsManager.mongo.js";
//import productsManager from "../../dao/fs/ProductsManager.fs.js";
import CustomRouter from "../CustomRouter.js";
//import dao from "../../dao/dao.factory.js"
import productsRepository from "../../repositories/products.rep.js";
import passportCb from "../../middlewares/passportCb.mid.js";
//const { products } = dao;
class ProductsRouter extends CustomRouter{
  init(){
    this.read("/paginate", ["PUBLIC", "USER"], read_paginate)
    this.read("/:pid", ["PUBLIC","USER"], read_one);
    this.read("/category/:category", ["PUBLIC","USER"], read_category);

  }
}

async function read_one(req, res, next){
  try { 
    const { pid } = req.params;
    const one = await productsRepository.readOneRepository(pid);

    if (req.user) {
      const user_id = req.user._id
      return res.render("productDetail", {
        product: one,
        user_id: user_id,
      });
     } else {
      return res.render("productDetail", {
        product: one
      });
    } 
  } catch (error) {
    return next(error);
  }
}

async function read_paginate (req, res, next) {
  try {
    const { page, limit } = req.query;
    const response = await fetch(
      `http://localhost:8080/api/products/paginate?limit=${limit}&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const fetchedDocs = await response.json();

    //console.log(req.user)


    if (req.user) {
      const user_id = req.user._id
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
        url: "/products"
      }); 
    }
  } catch (error) {
    return next(error);
  }
};

async function read_category(req, res, next) {
  try {
    
    
    const { category } = req.params;
    const response = await fetch(
      `http://localhost:8080/api/products/paginate?category=${category}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const fetchedDocs = await response.json();
    if (req.user) {
      const user_id = req.user._id 
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
};
const productsRouter = new ProductsRouter
export default productsRouter.getRouter();