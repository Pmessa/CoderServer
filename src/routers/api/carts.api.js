import CustomRouter from "../CustomRouter.js";
//import cartsManager from "../../dao/fs/CartsManager.fs.js";
import { read, readOne, create, update, destroy, destroyAll } from "./../../controllers/carts.controller.js"

class CartsRouter extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC"], create);
    this.read("/", ["PUBLIC"], read);
    this.read("/:pid", ["USER"], readOne);
    this.update("/:pid", ["USER"], update);
    this.destroy("/all", ["PUBLIC"], destroyAll);
    this.destroy("/:pid", ["PUBLIC"], destroy);
  }
}

const cartsRouter = new CartsRouter();

export default cartsRouter.getRouter();
