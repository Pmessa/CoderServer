import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";

import indexRouter from "./src/routers/index.router.js";
import socketCb from "./src/routers/index.socket.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";

const server = express();
const port = 8080;
const ready = () => console.log("server ready on port" + port);
const nodeServer = createServer(server);
const socketServer = new Server(nodeServer);

socketServer.on("connection", socketCb);
nodeServer.listen(port, ready);
//Se inicia/levanta el servidor

//middlewares
server.use(express.json()); //permite leer req.params y req.query
server.use(express.urlencoded({ extended: true }));
 //Obligo a mi servidor a usar la funcion encargada de leer parametros/consultas
 server.use(express.static(__dirname + "/public"))
server.use(morgan("dev"));

//template engine
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
