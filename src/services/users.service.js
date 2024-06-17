import Service from "./service.js";
import usersManager from "./../dao/mongo/managers/UserManager.mongo.js";
//import usersManager from "./../dao/fs/UsersManager.fs.js";
//import usersManager from "./../dao/memory/UsersManager.memory.js";

const usersService = new Service(usersManager)
export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
} = usersService;
