import { Router } from "express";
/* import usersManager from "../../data/fs/UsersManager.fs.js" */
import usersManager from "../../data/mongo/managers/UserManager.mongo.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    if (req.session.user_id) {
      //console.log(req.session)
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
    if (req.session.user_id){
      return res.redirect("/users")
    } else {
    return res.render("register");
    }
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/login", async (req, res, next) => {
  try {
    if (req.session.user_id){
      return res.redirect("/users")
    } else {
    return res.render("login");
    }
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/google", async (req, res, next) => {
  try {
    return res.redirect("http://localhost:8080/api/sessions/google")
    /*
    let response = await fetch("http://localhost:8080/api/sessions/google", {
      method: "GET",
      credentials: "include"
    });
    
    if (res.status === 200) {
    //console.log(req.user)
      res.redirect("/");
    } else {
      throw new Error("Failed to authenticate with Google");
    }
    */
  } catch (error) {
    next(error);
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
