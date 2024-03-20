import express from "express";

const server = express();
const port = 8080;
const ready = () => console.log("Server rady on port " + port);

server.listen(port, ready);
