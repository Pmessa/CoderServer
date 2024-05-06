import Carts from "../models/cart.models.js";
import Manager from "../Manager.mongo.js";

const cartManager = new Manager(Carts)

export default cartManager;
