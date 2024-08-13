import Service from "./service.js";
//import productsManager from "./../dao/mongo/managers/ProductsManager.mongo.js";
//import dao from "../dao/dao.factory.js";
import productsRepository from "../repositories/products.rep.js"

//const { products } = dao


const productsService = new Service(productsRepository)
export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
  paginateService
} = productsService;
