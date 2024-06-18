import Service from "./service.js";
//import cartsManager from "./../dao/mongo/managers/CartsManager.mongo.js";
import dao from "../dao/dao.factory.js";

const { carts } = dao
const cartsService = new Service(carts)
export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
  destroyAllService
} = cartsService;
