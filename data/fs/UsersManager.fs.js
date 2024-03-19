const fs = require("fs");
const crypto = require("crypto");

class UsersManager {
    constructor() {
        // Ruta del archivo JSON donde se almacenarán los usuarios
        this.path = "./files/users.json";
        // Inicializa la clase
        console.log(this.path);
        this.init();
    }

    init() {
        // Comprueba si el archivo de usuarios ya existe
        const exists = fs.existsSync(this.path);
        // Si no existe crea 4 usuarios por defecto 
        if (!exists) {
            const defaultUsers = [
                {
                    id: crypto.randomBytes(12).toString("hex"),
                    photo: "fotodaniel.jpg",
                    email: "daniel73@gmail.com",
                    password: "Daniel123",
                    role: "user",
                },
                {
                    id: crypto.randomBytes(12).toString("hex"),
                    photo: "fotohector.jpg",
                    email: "hector55@gmail.com",
                    password: "Hector123",
                    role: "user",
                },
                {
                    id: crypto.randomBytes(12).toString("hex"),
                    photo: "fotocristian.jpg",
                    email: "cristian33@gmail.com",
                    password: "Cristian123",
                    role: "user",
                },
                {
                    id: crypto.randomBytes(12).toString("hex"),
                    photo: "fotosebas.jpg",
                    email: "adminsebas@gmail.com",
                    password: "admin123",
                    role: "admin",
                },
            ];
            //Convierte los usuarios en JSON
            const stringData = JSON.stringify(defaultUsers, null, 2);
            //Escribe los usuarios en el archivo
            fs.writeFileSync(this.path, stringData);
            console.log("ARCHIVO DE USUARIOS CREADO!");
        } else {
            console.log("ARCHIVO DE USUARIOS YA EXISTE!");
        }
    }
    //Creo el método create
    async create(data) {
        try {
            //Si no tengo alguna de las propiedades
            if (!data.email || !data.password || !data.role) {
                throw new Error("Email, password, and role are required");
            }
            //Si tengo los datos entonces creo un nuevo usuario
            else {
                const user = {
                    id: crypto.randomBytes(12).toString("hex"),
                    //Si no proporcionan la foto se usa una predeterminada 
                    photo: data.photo || "https://cdn-icons-png.freepik.com/512/266/266033.png",
                    email: data.email,
                    password: data.password,
                    role: data.role,
                };
                //Lee todos los usuarios del archivo
                let all = await fs.promises.readFile(this.path, "utf-8");
                //Convierte los usuarios en formato JSON a un objeto JS
                all = JSON.parse(all);
                //Agrega el nuevo usuario al array
                all.push(user);
                //Convierte el array de usuarios a JSON 
                all = JSON.stringify(all, null, 2);
                //Escribe los usuarios actualizados en el archivo
                await fs.promises.writeFile(this.path, all);
                console.log({ createdUser: user.id });
                return user;
            }
        } catch (error) {
            console.log(error);
        }
    }
    //Creamos el método read
    async read() {
        try {
            //Lee todos los usuarios del archivo
            let all = await fs.promises.readFile(this.path, "utf-8");
            //Convierte los usuarios JSON a un objeto JS
            all = JSON.parse(all);
            //Compruebo si no hay usuarios tiro un error
            if (all.length === 0) {
                throw new Error("NO HAY USUARIOS");
            } else {
                //Si hay muestro todos los usuarios
                console.log(all);
                return all;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async readOne(id) {
        try {
            //Lee todos los usuarios del archivo
            let all = await fs.promises.readFile(this.path, "utf-8");
            //Convierte los usuarios JSON a un objeto JS
            all = JSON.parse(all);
            //Uso el método find para buscar el usuario con el ID especifico  
            const user = all.find((user) => user.id === id);
            //Si no encuentra el usuario tira el error
            if (!user) {
                throw new Error("USUARIO NO ENCONTRADO");
            } else {//Si lo encuentra lo muestra 
                console.log(user);
                return user;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async destroy(id) {
        try {
            //Lee todos los usuarios del archivo
            let all = await fs.promises.readFile(this.path, "utf-8");
            //Convierte los usuarios JSON a un objeto JavaScript
            all = JSON.parse(all);

            //Busca el usuario con el ID especificado
            const deletedUser = all.find((user) => user.id === id);
            //Si el usuario no se encuentra, lanza un error
            if (!deletedUser) {
                throw new Error("USUARIO NO ENCONTRADO");
            } else {
                //Filtra los usuarios excluyendo al usuario con el ID especificado
                const filteredUsers = all.filter((user) => user.id !== id);
                //Convierte el array de usuarios filtrados de nuevo a formato JSON
                const stringData = JSON.stringify(filteredUsers, null, 2);
                //Escribe los usuarios actualizados en el archivo
                await fs.promises.writeFile(this.path, stringData);
                //Imprime el usuario eliminado
                console.log({ deletedUser });
                //Devuelve el usuario eliminado
                return deletedUser;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

async function test() {
    try {
        const users = new UsersManager();

        // Prueba de lectura de usuarios
        console.log("Prueba de lectura de usuarios:");
        await users.read();

        // Prueba de creación de usuario
        console.log("Prueba de creación de usuario:");
        await users.create({
            email: "carlos@gmail.com",
            password: "Carlos123",
            role: "user",
        });

        // Prueba de lectura de usuarios después de la creación
        console.log("Prueba de lectura de usuarios después de la creación:");
        await users.read();

        // Prueba de lectura de un usuario específico
        console.log("Prueba de lectura de un usuario específico:");
        const allUsers = await users.read(); // Obtener todos los usuarios
        const firstUserId = allUsers[0]?.id; // Obtener el ID del primer usuario si existe
        if (firstUserId) {
            await users.readOne(firstUserId); // Leer el primer usuario
        } else {
            console.log("No se puede realizar la prueba de lectura de un usuario específico porque no hay usuarios en la lista.");
        }

        // Prueba de eliminación de un usuario
        console.log("Prueba de eliminación de un usuario:");
        if (firstUserId) {
            await users.destroy(firstUserId); // Eliminar el primer usuario
        } else {
            console.log("No se puede realizar la prueba de eliminación de usuario porque no hay usuarios en la lista.");
        }

    } catch (error) {
        console.log("Error en test:", error);
    }
}

test();


