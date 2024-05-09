import "dotenv/config.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import indexRouter from "./src/routers/index.router.js";
import socketCb from "./src/routers/index.socket.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import dbconnect from "./src/utils/dbConnect.util.js";

//console.log("TODAS LAS VARIABLES DE ENTORNO: " + process.env);
//console.log(process.env.MONGO_URI);

const server = express();
const port = process.env.PORT || 8080;
const ready = async () => {
  console.log("server ready on port: " + port);
  await dbconnect();
};
const nodeServer = createServer(server);
const socketServer = new Server(nodeServer);

socketServer.on("connection", socketCb);
nodeServer.listen(port, ready);
//Se inicia/levanta el servidor

//middlewares
server.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);
server.use(cookieParser(process.env.SECRET_COOKIES));
server.use(express.json()); //permite leer req.params y req.query
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));

//template engine
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
