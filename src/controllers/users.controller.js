import {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
} from "./../services/users.service.js";
class UsersController {
  async create(req, res, next) {
    try {
      const data = req.body;
      const one = await createService(data);
      return res.message201("CREATED ID: " + one._id);
    } catch (error) {
      return next(error);
    }
  }
  async read(req, res, next) {
    try {
      const { role } = req.query;
      const all = await readService({role});
      if (all.length > 0) {
        return res.response200(all);
      } else {
        res.error404("Not found users!");
      }
    } catch (error) {
      return next(error);
    }
  }
  async readOne(req, res, next) {
    try {
      const { uid } = req.params;
      const one = await readOneService(uid);
      if (one) {
        return res.response200(one);
      } else {
        res.error404("User not found!");
      }
    } catch (error) {
      return next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { uid } = req.params;
      const data = req.body;
      const one = await updateService(uid, data);
      if (one) {
        return res.response200(one);
      } else {
        res.error404("User not found!");
      }
    } catch (error) {
      return next(error);
    }
  }
  async destroy(req, res, next) {
    try {
      const { uid } = req.params;
      const one = await destroyService(uid);
      if (one) {
        return res.response200(one);
      } else {
        res.error404("User not found!");
      }
    } catch (error) {
      return next(error);
    }
  }
}

const userController = new UsersController();

export const { create, read, readOne, update, destroy } = userController;