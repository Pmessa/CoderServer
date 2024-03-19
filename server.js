import express from "express";

const server = express();
const port = 8080;
const ready = () => console.log("server ready on port" + port);

server.listen(port, ready);

server.get("/",async(requerimientos, respuesta)=>{
    try {
        return respuesta.status(200).json({
            responce: "CODER API",
            success: true
        })
    } catch (error) {
        console.log(error);
        return respuesta.status(500).json({
            response: "CODER API ERROR",
            success:false
        })
    }
})