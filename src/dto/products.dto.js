import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

const persistence = argsUtil.persistence;

class ProductsDTO {
  constructor(data) {
    persistence !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.title = data.title;
    (this.photo =
      data.photo ||
      "https://www.grandespymes.com.ar/wp-content/uploads/2020/10/nuevo-producto-830x518.jpg"),
      (this.category = data.category || "Without category"),
      (this.stock = data.stock);
    this.price = data.price;
    persistence !== "mongo" && (this.createdAt = new Date());
    persistence !== "mongo" && (this.updatedAt = new Date());
    persistence !== "mongo" && (this.__v = 0);
  }
}

export default ProductsDTO