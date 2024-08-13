import Service from "./service.js";
//import usersManager from "./../dao/mongo/managers/UserManager.mongo.js";
//import usersManager from "./../dao/fs/UsersManager.fs.js";
//import usersManager from "./../dao/memory/UsersManager.memory.js";
//import dao from "../dao/dao.factory.js";
import usersRepository from "../repositories/users.rep.js"

//const { users } = dao
const usersService = new Service(usersRepository)
export const {
  createService,
  readService,
  readOneService,
  readByEmailService,
  updateService,
  destroyService,
} = usersService;
