import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true},
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
        "sopas",
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
schema.plugin(mongoosePaginate);
const Product = model(collection, schema);
export default Product;
