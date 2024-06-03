import { Schema, Types, model } from "mongoose";

const collection = "carts";
const schema = new Schema(
  {
    user_id: { type: Types.ObjectId, required: true, index:true, ref: "users" },
    product_id: { type: Types.ObjectId, required: true, index:true, ref: "products" },
    quantity: { type: Number, default: 1 },
    state: {
      type: String,
      default: "reserved",
      enum: ["reserved", "paid", "delivered"],
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("find", function () {
  this.populate("user_id", "email role");
});
schema.pre("find", function () {
  this.populate("product_id");
});

const Cart = model(collection, schema);
export default Cart;
