import Carts from "../models/cart.models.js";
import Manager from "../Manager.mongo.js";

const cartManager = new Manager(Carts)

async function test() {
  try {
    await cartManager.create({
      user_id:"User_id",
      product_id:"Product_id",
      quantity:1,
      state:"reserved",
    });
    await cartManager.read()
    await cartManager.readOne("702b81e18fcefbf26073c386")
    await cartManager.destroy("024b9d9c03558eaac32c1b76")
    await cartManager.read()
  } catch (error) {
    console.log(error);
  }
}

test();
export default cartManager
