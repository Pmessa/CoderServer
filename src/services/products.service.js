import Service from "./service.js";
//import productsManager from "./../dao/mongo/managers/ProductsManager.mongo.js";
import dao from "../dao/dao.factory.js";

const { products } = dao
import productsRepository from "../repositories/products.rep.js"

const productsService = new Service(products)
export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
  paginateService
} = productsService;
