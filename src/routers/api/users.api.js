import CustomRouter from "../CustomRouter.js";
import usersManager from "../../data/mongo/managers/UserManager.mongo.js";

class UsersRouter extends CustomRouter{
  init(){
    this.create("/register", ["PUBLIC"], create);
    this.create("/", ["PUBLIC"], create);
    this.read("/", ["ADMIN","USER"], read);
    this.read("/:uid", ["PUBLIC"], readOne);
    this.update("/:uid", ["USER"], update);
    this.destroy("/:uid", ["ADMIN"], destroy);
    this.read("/register", ["PUBLIC"], read);
  }
}

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await usersManager.message201("CREATED ID: " + one.id);
  } catch (error) {
    return next(error);
  }
}

async function read(req, res, next) {
  try {
    const { role } = req.query;
    const all = await usersManager.read(role);
    if (all.length > 0) {
      return res.response200(all);
    } else {
      res.error404()
    }
  } catch (error) {
    
    return next(error);
  }
}

async function readOne(req, res, next) {
  try {
    const { uid } = req.params;
    const one = await usersManager.readOne(uid);
    if (one) {
      return res.response200(one);
    } else {
      res.error404()
    }
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { uid } = req.params;
    const data = req.body;
    const one = await usersManager.update(uid, data);
    if (one) {
      return res.response200(one);
    } else {
      const error = new Error("Not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { uid } = req.params;
    const one = await usersManager.destroy(uid);
    if (one) {
      return res.response200(one);
    } else {
      const error = new Error("Not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}
const usersRouter = new UsersRouter
export default usersRouter.getRouter();
