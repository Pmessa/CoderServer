import Service from "./service.js";
//import cartsManager from "./../dao/mongo/managers/CartsManager.mongo.js";
//import dao from "../dao/dao.factory.js";
import cartsRepository from "../repositories/carts.rep.js";
//const { carts } = dao

const cartsService = new Service(cartsRepository)
export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
  destroyAllService
} = cartsService;
