import fs from "fs";
import crypto from "crypto";
import UsersDTO from "../../dto/users.dto.js";

class UsersManager {
  constructor() {
    // Ruta del archivo JSON donde se almacenarán los usuarios
    this.path = "./src/dao/fs/files/users.json";
    // Inicializa la clase
    console.log(this.path);
    this.init();
  }

  init() {
    // Comprueba si el archivo de usuarios ya existe
    const exists = fs.existsSync(this.path);
    // Si no existe crea 4 usuarios por defecto
    if (!exists) {
      /* const defaultUsers = [
        {
          id: crypto.randomBytes(12).toString("hex"),
          photo: "/img/persona1.jpg",
          email: "daniel73@gmail.com",
          password: "Daniel123",
          role: 0,
        },
        {
          id: crypto.randomBytes(12).toString("hex"),
          photo: "img/persona1.jpg",
          email: "hector55@gmail.com",
          password: "Hector123",
          role: 0,
        },
        {
          id: crypto.randomBytes(12).toString("hex"),
          photo: "fotocristian.jpg",
          email: "cristian33@gmail.com",
          password: "Cristian123",
          role: 0,
        },
        {
          id: crypto.randomBytes(12).toString("hex"),
          photo: "fotosebas.jpg",
          email: "adminsebas@gmail.com",
          password: "admin123",
          role: 1,
        },
      ]; */
      //Convierte los usuarios en JSON
      const stringData = JSON.stringify([], null, 2);
      //Escribe los usuarios en el archivo
      fs.writeFileSync(this.path, stringData);
      //console.log("USER FILE CREATED!");
    } /* else {
      console.log("USER FILE ALREADY EXISTS!");
    } */
  }
  //Creo el método create
  async create(data) {
    try {
      //Si no tengo alguna de las propiedades
      if (!data.email || !data.password) {
        throw new Error("Email and password are required");
      }
      //Si tengo los datos entonces creo un nuevo usuario
      else {
        /* const user = {
          id: crypto.randomBytes(12).toString("hex"),
          //Si no proporcionan la foto se usa una predeterminada
          photo:
            data.photo ||
            "https://cdn-icons-png.freepik.com/512/266/266033.png",
          email: data.email,
          password: data.password,
          role: data.role || 0,
        }; */
        //Lee todos los usuarios del archivo
        let all = await fs.promises.readFile(this.path, "utf-8");
        //Convierte los usuarios en formato JSON a un objeto JS
        all = JSON.parse(all);
        //Agrega el nuevo usuario al array
        all.push(data);
        //Convierte el array de usuarios a JSON
        all = JSON.stringify(all, null, 2);
        //Escribe los usuarios actualizados en el archivo
        await fs.promises.writeFile(this.path, all);
        //console.log({ createdUser: user.id });
        return data;
      }
    } catch (error) {
      throw error;
    }
  }
  //Creamos el método read
  async read(filter) {
    try {
      //Lee todos los usuarios del archivo
      let all = await fs.promises.readFile(this.path, "utf-8");
      //Convierte los usuarios JSON a un objeto JS
      all = JSON.parse(all);
      if (filter) {
        all = all.filter((user) => user.role === filter);
      }
      if(!all) {
      const error = new Error ("NOT FOUND");
      error.statusCode = 404;
      throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      //Lee todos los usuarios del archivo
      let all = await fs.promises.readFile(this.path, "utf-8");
      //Convierte los usuarios JSON a un objeto JS
      all = JSON.parse(all);
      //Uso el método find para buscar el usuario con el ID especifico
      let one = all.find((one) => one._id === id);
      //Si no encuentra el usuario tira el error
      if (!one) {
        const error = new Error("USER NOT FOUND");
        error.statusCode = 404;
        throw error;
      } else {
        //Si lo encuentra lo muestra
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
  async readByEmail(email) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      
      let one = all.find((one) => one.email === email);
 
        return one;
    } catch (error) {
      throw error;
    }
  }
  //creamos el metodo update
  async update(id, data) {
    try {
      let all = await this.read();
      let one = all.find((each) => each._id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        return one;
      } else {
        const error = new Error("Not Fonud users");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let one = all.find((each) => each._id === id);
      if (one) {
        let filtered = all.filter((each) => each._id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
      }
      return one;
    } catch (error) {
      throw error;
    }
  }
}

/* async function test() {
  try {
    const users = new UsersManager();

    // Prueba de lectura de usuarios
    console.log("User reading test:");
    await users.read();

    // Prueba de creación de usuario
    console.log("User creation test:");
    await users.create({
      email: "carlos@gmail.com",
      password: "Carlos123",
      role: 0,
    });

    // Prueba de lectura de usuarios después de la creación
    console.log("User read test after creation:");
    await users.read();

    // Prueba de lectura de un usuario específico
    console.log("Test reading a specific user:");
    const allUsers = await users.read(); // Obtener todos los usuarios
    const firstUserId = allUsers[0]?.id; // Obtener el ID del primer usuario si existe
    if (firstUserId) {
      const user = await users.readOne(firstUserId); // Leer el primer usuario
      console.log(user);
    } else {
      console.log(
        "A specific user cannot be read tested because there are no users in the list."
      );
    }

    // Prueba de eliminación de un usuario
    console.log("Test deleting a user:");
    if (firstUserId) {
      await users.destroy(firstUserId); // Eliminar el primer usuario
    } else {
      console.log(
        "The user deletion test cannot be performed because there are no users in the list."
      );
    }
  } catch (error) {
    console.log("Error in test:", error);
  }
}

//test(); */

const usersManager = new UsersManager();
export default usersManager;
