import {
  readByEmailService,
  updateService,
} from "../services/users.service.js";

class SessionController {
  async register(req, res, next) {
    try {
      return res.message201("Registered!");
    } catch (error) {
      return next(error);
    }
  }
  async login(req, res, next) {
    try {
      return res
        .cookie("token", req.user.token, { signedCookie: true })
        .message200("Logged in!");
    } catch (error) {
      return next(error);
    }
  }
  async verifyCode(req, res, next) {
    try {
      const { email, code } = req.body;
      const one = await readByEmailService(email);
      const verify = code === one.verifyCode;
      if (verify) {
        await updateService( one._id, { verify });
        return res.message200("Verified User!");
      } else {
        return res.error400("Invalid Credentials");
      }
    } catch (error) {
      return next(error);
    }
  }
  async profile(req, res, next) {
    try {
      if (req.user.online) {
        return res.response200(req.user);
      }
      const error = new Error("Bad auth");
      error.statusCode = 401;
      throw error;
    } catch (error) {
      return next(error);
    }
  }
  signout(req, res, next) {
    try {
      if (req.cookies) {
        return res.clearCookie("token").message200("Signed out!");
      }
      const error = new Error("Invalid credentials from signout");
      error.statusCode = 401;
      throw error;
    } catch (error) {
      return next(error);
    }
  }
  google(req, res, next) {
    try {
      res.cookie("token", req.user.token, { signedCookie: true });
      res.redirect("/");
    } catch (error) {
      return next(error);
    }
  }
}

const sessionController = new SessionController();

export const { register, login, profile, signout, google, verifyCode } = sessionController;
