import { Router } from "express";
/* import usersManager from "../../data/fs/UsersManager.fs.js" */
import usersManager from "../../data/mongo/managers/UserManager.mongo.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    if (req.session.user_id) {
      const one = await usersManager.readOne(req.session.user_id);
      return res.render("details", { user: one, user_id: req.session.user_id });
    } else {
    const users = await usersManager.read();
      return res.render("users", { users });
    }
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/register", async (req, res, next) => {
  try {
    return res.render("register");
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/login", async (req, res, next) => {
  try {
    return res.render("login");
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await usersManager.readOne(uid);
    //return res.render("details", { user: one });
    if (req.session.user_id) {
      return res.render("details", { user: one, user_id: req.session.user_id });
    } else {
      return res.render("details", { user: one, user_id: req.session.user_id });
    }
  } catch (error) {
    return res.render("details");
  }
});

export default usersRouter;
