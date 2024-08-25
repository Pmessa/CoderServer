import isProductOwner from "../../middlewares/isProductOwner.js";
import CustomRouter from "../CustomRouter.js";
//import cartsManager from "../../dao/fs/CartsManager.fs.js";
import { read, readOne, create, update, destroy, destroyAll } from "./../../controllers/carts.controller.js"

class CartsRouter extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC", "USER", "PREM"], isProductOwner, create);
    this.read("/", ["PUBLIC", "USER", "PREM"], read);
    this.read("/:pid", ["USER", "PREM"], readOne);
    this.update("/:pid", ["USER", "PREM"], update);
    this.destroy("/all", ["PUBLIC", "USER", "ADMIN"], destroyAll);
    this.destroy("/:pid", ["PUBLIC"], destroy);
  }
}

const cartsRouter = new CartsRouter();

export default cartsRouter.getRouter();
