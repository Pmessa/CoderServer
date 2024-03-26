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
server.use(express.urlencoded({ extended: true }));
//Obligo a mi servidor a usar la funcion encargada de leer parametros/consultas
//permite leer req.params y req.query
server.use(express.json());

//Router
server.get("/", async (req,res)=> {
    try {
        return res.json({
            statusCode: 200,
            message: "CODER API OK"
        })
    } catch (error) {
        return res.json({
            statusCode: 500,
            message: "CODER API ERROR"

        })
    }
})
const create = async (req,res)=> {
    try {
        const data = req.body
        const one = usersManager.create(data)
        return res.json({
            statusCode: 201,
            message: "CREATED ID: "+one.id
        })
        
    } catch (error) {
        return res.json({
            statusCode: error.statusCode || 500,
            message: error.message || "CODER API ERROR"

        })
        
    }
}
server.post("/api/users", create)












/* server.get("/", async (requerimientos, respuesta) => {
  try {
    return respuesta.status(200).json({
      responce: "CODER API",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return respuesta.status(500).json({
      response: "CODER API ERROR",
      success: false,
    });
  }
}); */

/* server.get("/api/users", async (req, res) => {
  try {
    const { role } = req.query;
    const all = await usersManager.read(role);
    if (all.length !== 0) {
      return res.status(200).json({
        statusCode: 200,
        response: all,
        success: true,
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        response: null,
        message: "No users found for the specified role.",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      response: "Internal Server Error",
      success: false,
    });
  }
}); */
/* server.get("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const one = await usersManager.readOne(uid);
    if (one) {
      return res.status(200).json({
        statusCode: 200,
        response: one,
        success: true,
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        response: null,
        message: "User not found.",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      response: "Internal Server Error",
      success: false,
    });
  }
});
 */