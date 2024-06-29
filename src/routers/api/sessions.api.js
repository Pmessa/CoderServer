import CustomRouter from "../CustomRouter.js";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { register, login, profile, signout, google, verifyCode } from "./../../controllers/sessions.controller.js"
class SessionsRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], passportCb("register"), register);
    this.create("/verify", ["PUBLIC"], verifyCode);
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
    this.read("/online", ["USER", "ADMIN"], passportCb("jwt"), profile);
    this.read("/google",["PUBLIC"], passport.authenticate("google", { scope: ["email", "profile"] }),passportCb("google"));
    this.read("/google/callback", ["PUBLIC"], passport.authenticate("google", { session: false }), google);
    this.create("/signout", ["USER", "ADMIN"], signout);
  }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();
