import { config } from "dotenv";
import argsUtil from "./args.util.js";

const { env } = argsUtil;

const path = env === "prod" ? "./.env.prod" : "./.env.dev";

config({ path });

const environment = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  HOST_PORT: process.env.HOST_PORT,
  MONGO_URI: process.env.MONGO_URI,
  SECRET_COOKIE: process.env.SECRET_COOKIE,
  SECRET_SESSION: process.env.SECRET_SESSION,
  SECRET_JWT: process.env.SECRET_JWT,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,
  GOOGLE_PASSWORD: process.env.GOOGLE_PASSWORD,
  STRIPE_KEY: process.env.STRIPE_KEY,
  STRIPE_KEY_SECRET: process.env.STRIPE_KEY_SECRET

};

export default environment;