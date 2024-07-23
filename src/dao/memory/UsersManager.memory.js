import crypto from "crypto";

class UsersManager {
  static #users = [];
  //static #userId = [];
  async create(data) {
    try {
      /* const user = {
        id: data.id || crypto.randomBytes(12).toString("hex"),
        photo:
          data.photo || "https://cdn-icons-png.freepik.com/512/266/266033.png",
        email: data.email,
        password: data.password,
        role: data.role || 0,
      };  */
      const one = data;
      /* if (!data.email || !data.password) {
        throw new Error("INGRESE EMAIL/PASSWORD");
      } else */ 
        UsersManager.#users.push(data);
        //UsersManager.#userId.push(user.id);
        console.log("Created User");
        return one;
      
    } catch (error) {
      throw error;
    }
  }
  async read(filter) {
    try {
      if (UsersManager.#users.length === 0) {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      } else {
        if (filter) {
          const all = UsersManager.#users.filter(
            (user) => user.role === filter
          );
          if (!all) {
            const error = new Error("NOT FOUND");
            error.statusCode = 404;
            throw error;
          }
          return all;
        } else {
          const all = UsersManager.#users;
          return all;
        }
      }
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const one = UsersManager.#users.find((each) => each.id === id);
      if (!one) {
        throw new Error("THE USER DOES NOT EXIST");
      } else {
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
  async readByEmail(email) {
    try {
      const one = UsersManager.#users.find((each) => each.email === email);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      let one = UsersManager.#users.find((each) => each.id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
      }
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      let one = UsersManager.#users.find((each) => each.id === id);
      if (one) {
        UsersManager.#users = UsersManager.#users.filter(
          (each) => each.id !== id
        );
      }
      return one;
    } catch (error) {
      throw error;
    }
  }
}
const usersManager = new UsersManager();
export default usersManager;

/* let user1 = usersManager.create({
  photo: "photojorge.jpg",
  email: "jorge18@gmail.com",
  password: "Passjorge",
}); // crear un nuevo usuario
let user2 = usersManager.create({
  photo: "photocarlos.jpg",
  email: "carlos17@gmail.com",
  password: "PassCarlos",
}); // crear un nuevo usuario
let user3 = usersManager.create({
  photo: "photoluis.jpg",
  email: "luis13@gmail.com",
  password: "Passluis",
}); // crear un nuevo usuario
let user4 = usersManager.create({
  photo: "photojuan.jpg",
  email: "juan701@gmail.com",
  password: "PassJuan",
}); */ // crear un nuevo usuario

/*console.log(usersManager.read());
console.log(usersManager.readOne(user1.id));
usersManager.destroy(user4.id);
user1 = usersManager.update(user1.id, {
  photo: "newphoto.jpg",
  email: "newemail@gmail.com",
  password: "newpassword",
});

console.log(user1);
 */
