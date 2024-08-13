import CustomRouter from "../CustomRouter.js";
import { create, read, readOne, update, destroy } from "./../../controllers/users.controller.js"
class UsersRouter extends CustomRouter{
  init(){
    this.create("/register", ["PUBLIC"], create);
    this.create("/", ["ADMIN"], create);
    this.read("/", ["PUBLIC"], read);
    this.read("/:uid", ["PUBLIC"], readOne);
    this.update("/:uid", ["USER"], update);
    this.destroy("/:uid", ["ADMIN"], destroy);
    this.read("/register", ["PUBLIC"], read);
  }
}


const usersRouter = new UsersRouter
export default usersRouter.getRouter();
