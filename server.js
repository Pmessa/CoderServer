import express from "express";
import morgan from "morgan";
import indexRouter from "./src/router/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";

const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);

//middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));

// endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
