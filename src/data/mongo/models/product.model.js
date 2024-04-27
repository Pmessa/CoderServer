import { Schema, model } from "mongoose";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    photo: {
      type: String,
      default:
        "https://www.grandespymes.com.ar/wp-content/uploads/2020/10/nuevo-producto-830x518.jpg",
    },
    category: {
      type: String,
      index: true,
      default: "Without category",
      enum: [
        "condimentos",
        "snacks",
        "harinas",
        "bebidas",
        "frutos secos",
        "Sopas",
        "verduras",
        "cereales",
        "fermentados",
        "frutas",
        "proteinas",
        "suplementos",
        "Without category",
      ],
    },
    stock: { type: Number, default: 1 },
    price: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);
const Product = model(collection, schema);
export default Product;
