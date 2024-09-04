import CustomRouter from "../CustomRouter.js";
import isValidAdmin from "../../middlewares/isValidAdmin.mid.js";
import uploader from "../../middlewares/multer.mid.js";
import isPhoto from "../../middlewares/isPhoto.js";
import isPropAndDefault from "../../middlewares/isPropAndDefault.js";
import { read, paginate, readOne, create, update, destroy } from "./../../controllers/products.controller.js"
import isPremOrAdmin from "../../middlewares/isPremOrAdmin.js";
import isProductOwner from "../../middlewares/isProductOwner.js";

class ProductsRouter extends CustomRouter {
  init(){

    this.read("/", ["PUBLIC", "USER"], read);
    this.read("/me", ["PREM"], paginate);
    //this.read("/products/real", ["PUBLIC", "USER"], read);
    this.read("/paginate", ["PUBLIC"], paginate);
    //this.read("/paginate", ["PREM"], paginate);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.create(
      "/",/*
      isPremOrAdmin,
      uploader.single("photo"),
      isPhoto,*/
      ["PREM", "ADMIN"],
      isPropAndDefault,
      create
    );
    this.update("/:pid", ["ADMIN", "PREM"], isPremOrAdmin, update);
    this.destroy("/:pid", ["ADMIN", "PREM"], isPremOrAdmin, destroy);

  }  
}  



const productsRouter = new ProductsRouter();

export default productsRouter.getRouter();