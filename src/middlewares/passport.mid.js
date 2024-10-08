import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
//import usersManager from "../dao/mongo/managers/UserManager.mongo.js";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
//import dao from "../dao/dao.factory.js"
import usersRepository from "../repositories/users.rep.js";
import UsersDTO from "../dto/users.dto.js";
import crypto from "crypto";
import sendEmail from "../utils/mailing.utils.js";
//const { users } = dao

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        //LA ESTRATEGIA NECESARIA PARA REGISTRAR A UN USUARIO
        //QUE CONSTA DE TODO LO QUE VALIDAMOS EN LOS MIDDLEWARES
        if (!email || !password) {
          const error = new Error("Please enter email and password!");
          error.statusCode = 400;
          return done(null, null, error);
        }
        const one = await usersRepository.readByEmailRepository(email);
        if (one) {
          const error = new Error("Bad auth from register!");
          error.statusCode = 401;
          return done(error);
        }
        /* const hashPassword = createHash(password);
        req.body.password = hashPassword; */
        //const data = new UsersDTO(req.body);
        const user = await usersRepository.createRepository(req.body);
        //console.log("send email")
        await sendEmail({ to: email, name: user.name, code: user.verifyCode });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        //console.log(email)
        const one = await usersRepository.readByEmailRepository(email);
        if (!one) {
          const error = new Error("Bad auth from login!");
          error.statusCode = 401;
          return done(error);
        }
        const verifyPass = verifyHash(password, one.password);
        //console.log(verifyPass)
        const verifyAccount = one.verify;
        if (!verifyPass || !verifyAccount) {
          const error = new Error("Invalid Credentials");
          error.statusCode = 400;
          return done(error);
        }

        if (verifyPass) {
          //req.session.email = email;
          //req.session.online = true;
          //req.session.role = one.role;
          //req.session.photo = one.photo;
          //req.session.user_id = one._id;
          const user = {
            email,
            role: one.role,
            photo: one.photo,
            _id: one._id,
            online: true,
          };
          const token = createToken(user);
          user.token = token;
          //console.log(token);
          return done(null, user);
          //agrega la propiedad USER al objeto de requerimientos
          //esa propiedad user tiene todas las propiedades que estamos definiendo en el objeto correspondiente
        }
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        return done(error);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/sessions/google/callback",
      passReqToCallback: true,
    },
    async (req, accesToken, refreshToken, profile, done) => {
      try {
        //profile es el objeto que devuelve google con todos los datos del usuario
        //nosotros vamos a registrar un ID en lugar de un email

        const { id, picture } = profile;
        let one = await usersRepository.readByEmailRepository(id);
        if (!one) {
          one = {
            email: id,
            password: createHash(id),
            photo: picture,
          };
          one = await usersRepository.createRepository(one);
        }

        //req.session.email = email;
        //req.session.online = true;
        //req.session.role = one.role;
        //req.session.photo = one.photo;
        //req.session.user_id = one._id;
        const user = {
          email: one.email,
          role: one.role,
          photo: one.photo,
          _id: one._id,
          online: true,
        };
        const token = createToken(user);
        user.token = token;
        /*
        req.session.email = user.email;
        req.session.online = true;
        req.session.role = user.role;
        req.session.photo = user.photo;
        req.session.user_id = user._id;
        */
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
/*
passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: process.env.SECRET_JWT,
    },
    (data, done) => {
      try {
        if (data) {
          //console.log("jwt "+JSON.stringify(data))
          return done(null, data);
        } else {
          const error = new Error("Forbidden from jwt!");
          error.statusCode = 403;
          return done(error);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);*/
export default passport;
