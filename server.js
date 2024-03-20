import express from "express";
import usersManager from "./data/fs/UsersManager.fs.js";
//Server
const server = express();
//Se crea el servidor
const port = 8080;
const ready = () => console.log("server ready on port" + port);
server.listen(port, ready);
//Se inicia/levanta el servidor



//middelwares
server.use(express.urlencoded({ extended: true }))
//Obligo a mi servidor a usar la funcion encargada de leer parametros/consultas
//permite leer req.params y req.query

//Router
server.get("/", async (requerimientos, respuesta) => {
    try {
        return respuesta.status(200).json({
            responce: "CODER API",
            success: true
        })
    } catch (error) {
        console.log(error);
        return respuesta.status(500).json({
            response: "CODER API ERROR",
            success: false
        })
    }
})

server.get("/api/users/", async (req, res) => {
    try {
        const all = await usersManager.read()
        return res.status(200).json({
            response: all,
            success: true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: "ERROR",
            success: false
        })
    }

})
//tres parametro
server.get("/api/users/:email/:password/:role", async (req, res) => {
    try {
        const { email, password, role } = req.params
        const data = { email, password, role }
        const one = await usersManager.create(data)
        return res.status(201).json({
            response: one,
            success: true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            response: "ERROR",
            success: false
        })

    }
})