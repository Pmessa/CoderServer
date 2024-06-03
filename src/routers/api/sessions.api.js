<<<<<<< HEAD
import { Router } from "express";
import usersManager from "../../data/mongo/managers/UserManager.mongo.js"


const sessionsRouter = Router();

sessionsRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const one = await usersManager.readByEmail(email);
    if(one.password === password){
      req.session.email = email
      req.session.role = one.role
      return res.json({ statusCode:200, message: "Logged in"})
    }
    return res.json({statusCode:401, message:"Bad auth"})
  } catch (error) {
    return next(error);
  }
});
export default sessionsRouter
=======
import CustomRouter from "../CustomRouter.js";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], passportCb("register"), register);
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
    this.read("/online", ["PUBLIC"], passportCb("jwt"), profile);
    this.create("/signout", ["USER", "ADMIN"], signout);
    this.read("/google",["PUBLIC"], passport.authenticate("google", { scope: ["email", "profile"] }));
    this.read("/google/callback", ["PUBLIC"], passport.authenticate("google", { session: false }), google);
  }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();

async function register(req, res, next) {
  try {
    return res.message201("Registered!");
  } catch (error) {
    return next(error);
  }
}
async function login(req, res, next) {
  try {
    return res
      .cookie("token", req.user.token, { signedCookie: true })
      .message200("Logged in!");
      
  } catch (error) {
    return next(error);
  }
}
async function profile(req, res, next) {
  try {
    if (req.user.online) {
      return res.response200(req.user)
    }
    const error = new Error("Bad auth");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
}
function signout(req, res, next) {
  try {
    if (req.cookies) {
      return res.clearCookie("token").message200("Signed out!")
    }
    const error = new Error("Invalid credentials from signout");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
}
function google(req, res, next) {
  try {
    return res.message200("Logged in with google!");
  } catch (error) {
    return next(error);
  }
}
>>>>>>> aa038a20601ff7162db969c3223076642dc46e72
