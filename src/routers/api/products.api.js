import CustomRouter from "../CustomRouter.js";
import isValidAdmin from "../../middlewares/isValidAdmin.mid.js";
import uploader from "../../middlewares/multer.mid.js";
import isPhoto from "../../middlewares/isPhoto.js";
import isPropAndDefault from "../../middlewares/isPropAndDefault.js";
import { read, paginate, readOne, create, update, destroy } from "./../../controllers/products.controller.js"

class ProductsRouter extends CustomRouter {
  init(){

    this.read("/", ["PUBLIC"], read);
    this.read("/paginate", ["PUBLIC"], paginate);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.create(
      "/",
      isValidAdmin,
      uploader.single("photo"),
      isPhoto,
      isPropAndDefault,
      ["ADMIN"],
      create
    );
    this.update("/:pid", ["ADMIN"], update);
    this.destroy("/:pid", ["ADMIN"], destroy);

  }  
}  



const productsRouter = new ProductsRouter();

export default productsRouter.getRouter();