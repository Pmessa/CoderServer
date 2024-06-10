import Service from "./service.js";
import cartsManager from "./../data/mongo/managers/CartsManager.mongo.js";

const cartsService = new Service(cartsManager)
export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
  destroyAllService
} = cartsService;
