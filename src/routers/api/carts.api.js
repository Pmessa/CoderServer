import CustomRouter from "../CustomRouter.js";
//import cartsManager from "../../data/fs/CartsManager.fs.js";
import { read, readOne, create, update, destroy, destroyAll } from "./../../controllers/carts.controller.js"

class CartsRouter extends CustomRouter {
  init() {
    this.create("/", ["USER"], create);
    this.read("/", ["USER"], read);
    this.read("/:pid", ["USER"], readOne);
    this.update("/:pid", ["USER"], update);
    this.destroy("/all", ["USER"], destroyAll);
    this.destroy("/:pid", ["USER"], destroy);
  }
}

const cartsRouter = new CartsRouter();

export default cartsRouter.getRouter();
