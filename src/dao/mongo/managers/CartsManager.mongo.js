import Carts from "../models/cart.models.js";
import Manager from "../Manager.mongo.js";

const cartsManager = new Manager(Carts);

export default cartsManager;
