import environment from "./src/utils/env.util.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
//import expressSession from "express-session";
//import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import indexRouter from "./src/routers/index.router.js";
import socketCb from "./src/routers/index.socket.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
//import dbconnect from "./src/utils/dbConnect.util.js";
import argsUtil from "./src/utils/args.util.js";

const server = express();
const port = environment.PORT || argsUtil.p;
const ready = async () => {
  console.log("server ready on port: " + port);
  //await dbconnect();
  //hay que incluir la conexión a mongo desde el patrón factory
};
const nodeServer = createServer(server);
const socketServer = new Server(nodeServer);

socketServer.on("connection", socketCb);
nodeServer.listen(port, ready);
//Se inicia/levanta el servidor

server.use(cookieParser(environment.SECRET_COOKIE));
server.use(express.json()); //permite leer req.params y req.query
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
/* server.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
); */
 
//template engine
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
