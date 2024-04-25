import { Schema, model } from "mongoose";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      default: "without category",
      enum: [
        "Cereales y granos integrales",
        "Frutos secos y semillas",
        "Untables y Humus",
        "Quesos vegetales y Tofu",
        "Salsas aceites y aderesos",
        "bebidas",
        "Fermentos",
        "Without category",
      ],
    },
  },
  {
    timestamps: true,
  }
);
const Product = model(collection, schema);
export default Product;
