//import { Router } from "express";
/* import usersManager from "../../dao/fs/UsersManager.fs.js" */
//import usersManager from "../../dao/mongo/managers/UserManager.mongo.js";
//import dao from "../../dao/dao.factory.js"
//import { verifyToken } from "../../utils/token.util.js";
import CustomRouter from "../CustomRouter.js";
//import { create, read, readOne, update, destroy } from "./../../controllers/users.controller.js"
import passportCb from "../../middlewares/passportCb.mid.js";
import usersRepository from "../../repositories/users.rep.js";

//const { users } = dao

class UsersRouter extends CustomRouter{
  init(){

    
    this.read("/", ["USER"], read_user);

    this.read("/register", ["PUBLIC"], register_user);
    this.read("/login", ["PUBLIC"], login_user);
    this.read("/verify", ["PUBLIC"], verify_user);
    this.read("/google", ["PUBLIC"], google_user);
  }
}


function read_user(req, res, next){
  try{
  return res.render("details", { user: req.user, user_id: req.user._id });
  }
  catch(error){
    return next(error)
  }
}

function register_user(req, res, next) {
  try {
    return res.render("register");
  } catch (error) {
    return next(error);
  }
}
function login_user(req, res, next) {
  try {
    return res.render("login");
  } catch (error) {
    return next(error);
  }
}
function verify_user (req, res, next) {
  try {
    return res.render("verify");
  } catch (error) {
    return next(error);
  }
}
function google_user(req, res, next){
  try {
    return res.redirect("http://localhost:8080/api/sessions/google");
  } catch (error) {
    next(error);
  }
}
/*
usersRouter.get("/", async (req, res, next) => {
  const data = null
  if (req.cookies.token) {
    data = verifyToken(req.cookies.token)
  }
  try {
    if (data._id) {
      const user_id = data._id
      const one = await users.readOne(user_id);
      return res.render("details", { user: one, user_id });
    } else {
      const users = await users.read();
      return res.render("users", { users });
    }
  } catch (error) {
    return next(error);
  }
});
*/
/*
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
usersRouter.get("/verify", async (req, res, next) => {
  try {
    return res.render("verify");
  } catch (error) {
    return next(error);
  }
});
*/
/*
usersRouter.get("/google", async (req, res, next) => {
  try {
    return res.redirect("http://localhost:8080/api/sessions/google");
    
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
    
  } catch (error) {
    next(error);
  }
});

/* usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await usersManager.readOne(uid);
    return res.render("details", { user: one });
     if (req.session.user_id) {
      return res.render("details", { user: one, user_id: req.session.user_id });
    } else {
      return res.render("details", { user: one, user_id: req.session.user_id });
    } 
  } catch (error) {
    return res.render("details");
  }
}); */
const usersRouter = new UsersRouter

export default usersRouter.getRouter()
