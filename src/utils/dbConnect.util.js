import { connect } from "mongoose";
import environment from "./env.util.js";

async function dbconnect() {
  try {
    console.log("conectando");
    await connect(environment.MONGO_URI);
    console.log("connected to mongo database");
  } catch (error) {
    console.log(error);s
  }
}

export default dbconnect;
