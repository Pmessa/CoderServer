import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";


import indexRouter from "./src/router/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";




//Server
const server = express();
//Se crea el servidor
const port = 8080;
const ready = () => console.log("server ready on port" + port);
server.listen(port, ready);
//Se inicia/levanta el servidor

//middlewares
server.use(express.json());//permite leer req.params y req.query
server.use(express.urlencoded({ extended: true }));//Obligo a mi servidor a usar la funcion encargada de leer parametros/consultas
server.use(morgan("dev"))

//template engine
server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname+'/src/views')

//endpoints
server.use("/", indexRouter)
server.use(errorHandler);
server.use(pathHandler);


