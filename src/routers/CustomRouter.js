import { Router, json } from "express";
import { verifyToken } from "../utils/token.util.js";
//import usersManager from "../dao/mongo/managers/UserManager.mongo.js";
import usersRepository from "../repositories/users.rep.js";
import winston from "../utils/winston.util.js";

class CustomRouter {
  //para construir y configurar cada instancia del enrutador
  constructor() {
    this.router = Router();
    this.init();
  }
  //para obtener todas las rutas del enrutador definido
  getRouter() {
    return this.router;
  }
  //para inicializar las clases/propiedades heredades (sub-routers)
  init() {}
  //para manejar las callbacks (de middlewares y la final)
  applyCbs(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        return params[2](error);
      }
    });
  }
  response = (req, res, next) => {
    res.message200 = (message) => res.json({ statusCode: 200, message });
    res.response200 = (response) => res.json({ statusCode: 200, response });
    res.paginate = (response, info) =>
      res.json({ statusCode: 200, response, info });
    res.message201 = (message) => res.json({ statusCode: 201, message });
    res.error400 = (message) => {
      const errorMessage = `${req.method} ${
        req.url
      } 400 - ${new Date().toLocaleTimeString()} - ${message}`;
      winston.ERROR(errorMessage);
      return res.json({ statusCode: 400, message: message });
    };
    res.error401 = () => {
      const errorMessage = `${req.method} ${
        req.url
      } 401 - ${new Date().toLocaleTimeString()} - Bad auth from poliecies!}`;
      winston.ERROR(errorMessage);
      return res.json({ statusCode: 401, message: "Bad auth from poliecies!" });
    };

    res.error403 = () => {
      const errorMessage = `${req.method} ${
        req.url
      } 403 - ${new Date().toLocaleTimeString()} - Forbidden from poliecies!`;
      winston.ERROR(errorMessage);
      return res.json({
        statusCode: 403,
        message: "Forbidden from poliecies!",
      });
    };
    res.error404 = () => {
      const errorMessage = `${req.method} ${
        req.url
      } 404 - ${new Date().toLocaleTimeString()} - Not found docs`;
      winston.ERROR(errorMessage);
      return res.json({ statusCode: 404, message: "Not found docs" });
    };
    return next();
  };
  policies = (policies) => async (req, res, next) => {
    try {
      if (policies.includes("PUBLIC") && !policies.includes("USER"))
        return next();
      if (policies.includes("PUBLIC") && policies.includes("USER")) {
        const token = req.cookies["token"];
        //console.log("token: ",token)
        if (token) {
          const dataOfToken = verifyToken(token);
          const { email, role, _id } = dataOfToken;
          const user = await usersRepository.readByEmailRepository(email);
          req.user = user;
          //console.log("req.user: ", req.user);
          return next();
        } else {
          return next();
        }
      }
      const token = req.cookies["token"];
      //if (!token) return res.error401();
      const dataOfToken = verifyToken(token);
      const { email, role, _id } = dataOfToken;
      if (
        (policies.includes("USER") && role === 0) ||
        (policies.includes("ADMIN") && role === 1)
      ) {
        const user = await usersRepository.readByEmailRepository(email);
        req.user = user;
        //console.log("req.user: ", req.user);
        return next();
      }
      return res.error403();
    } catch (error) {
      return next(error);
    }
  };

  /*
   policies = (policies) => async (req, res, next) => {
    
    if (policies.includes("PUBLIC")) return next();
    else {
      //let token = null
      const token = req.cookies["token"];
      if (!token) return res.error401();
      else {
        try {
          token = verifyToken(token);
          const { role, email } = token;
          if (
            (policies.includes("USER") && role === 0) ||
            (policies.includes("ADMIN") && role === 1)
          ) {
            const user = await usersRepository.readByEmailRepository(email);
            //proteger contraseña del usuario!!!
            req.user = user;
            return next();
          } else return res.error403();
        } catch (error) {
          return res.error400(error.message);
        }
      }
    }
  }; 
  */
  //create( "/",  isValidAdmin,  uploader.single("photo"),  isPhoto,  isPropAndDefault, create);
  create(path, arrayOfPolicies, ...callbacks) {
    this.router.post(
      path,
      this.response,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  read(path, arrayOfPolicies, ...callbacks) {
    this.router.get(
      path,
      this.response,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  update(path, arrayOfPolicies, ...callbacks) {
    this.router.put(
      path,
      this.response,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  destroy(path, arrayOfPolicies, ...callbacks) {
    this.router.delete(
      path,
      this.response,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  use(path, ...callbacks) {
    this.router.use(path, this.response, this.applyCbs(callbacks));
  }
}
export default CustomRouter;
