import CustomRouter from "../CustomRouter.js";
import crypto from "crypto";
//import cartsManager from "../../data/fs/CartsManager.fs.js";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";

class CartsRouter extends CustomRouter{
  init(){

    this.read("/", ["USER"], read);
    //this.read("/test", ["USER"], test);
    this.read("/:pid", ["USER"], readOne);
    this.create("/", ["USER"], create);
    this.update("/:pid", ["USER"], update);
    this.destroy("/all", ["USER"], destroyAll);
    this.destroy("/:pid", ["USER"], destroy);
  }
}
async function read(req, res, next) {
  try {
    const { user_id } = req.query;
    const all = await cartsManager.readCart(user_id);
    if (all.length > 0) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      const error = new Error("Not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}
async function readOne(req, res, next) {
  try {
    const { pid } = req.params;
    const one = await cartsManager.readOne(pid);
    if (one) {
      return res.json({
        statusCode: 200,
        response: one,
        success: true,
      });
    } else {
      const error = new Error("NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}
async function create(req, res, next) {
  try {
    const data = req.body;
    const newProduct = {
      product_id: data.product_id,
      user_id: data.user_id,
      quantity: 1,
    };
    const one = await cartsManager.create(newProduct);
    return res.json({
      statusCode: 201,
      response: one,
      message: "CREATED ID. " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}
async function update(req, res, next) {
  try {
    const { pid } = req.params;
    const data = req.body;
    const one = await cartsManager.update(pid, data);
    return res.json({
      statusCode: 200,
      message: one,
    });
  } catch (error) {
    return next(error);
  }
}
async function destroy(req, res, next) {
  try {
    //console.log("asdasd")
    const { pid } = req.params;
    //console.log(pid)
    const one = await cartsManager.destroy(pid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}
async function destroyAll(req, res, next) {
  try {
    //console.log("hola")
    const { user_id } = req.body;
    //console.log(user_id)
    const all = await cartsManager.destroyAll({ user_id: user_id });
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
}
async function test() {
  try {
    console.log("Crear un documento de prueba:");
    await cartsManager.create({
      user_id: crypto.randomBytes(12).toString("hex"),
      product_id: crypto.randomBytes(12).toString("hex"),
      quantity: 1,
      state: "reserved",
    });
    console.log("Mostrar todos los carts:");
    const allCarts = await cartsManager.read();
    console.log(allCarts);
    console.log("Mostrar solo el primer cart:");
    const oneCart = await cartsManager.readOne(allCarts[0]._id);
    console.log(oneCart);
    console.log("Borrar ese cart:");
    await cartsManager.destroy(oneCart);
    console.log("Mostrar el resultado final total:");
    const allCartsNew = await cartsManager.read();
    console.log(allCartsNew);
  } catch (error) {
    console.log(error);
  }
}


const cartsRouter = new CartsRouter;

export default cartsRouter.getRouter();