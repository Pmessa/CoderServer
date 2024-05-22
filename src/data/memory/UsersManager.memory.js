import crypto from "crypto";

class UsersManager {
  static #users = [];
  static #userId = [];
  create(data) {
    try {
      const user = {
        id: data.id || crypto.randomBytes(12).toString('hex'),
        photo: data.photo || "https://cdn-icons-png.freepik.com/512/266/266033.png",
        email: data.email,
        password: data.password,
        role: data.role || 0,
      };
      if (!data.email || !data.password || !data.photo) {
        throw new Error("Email, password, and photo are required");
      } else {
        UsersManager.#users.push(user);
        UsersManager.#userId.push(user.id);
        console.log("Created User");
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
  read() {
    try {
      if (UsersManager.#users.length === 0) {
        throw new Error("THERE ARE NO USERS");
      } else {
        return UsersManager.#users;
      }
    } catch (error) {
      console.log(error);
    }
  }
  readOne(id) {
    try {
      const one = UsersManager.#users.find((each) => each.id === id);
      if (!one) {
        throw new Error("THE USER DOES NOT EXIST");
      } else {
        return one;
      }
    } catch (error) {
      console.log(error);
    }
  }
  destroy(id) {
    try {
      const userToRemove = this.readOne(id);
      const within = UsersManager.#users.filter((each) => each.id !== id);
      UsersManager.#users = within;
      console.log(within)
      console.log("USER DELETED");
      return userToRemove;
    } catch (error) {
      throw error;
    }
  }
  update(id, newData) {
    try {
      const userToUpdate = this.readOne(id);

      if (!userToUpdate) {
        throw new Error("User not found");
      }

      for (const prop in newData) {
        userToUpdate[prop] = newData[prop];
      }

      return userToUpdate;
    } catch (error) {
      throw error;
    }
  }

}
const gestorDeUsuarios = new UsersManager();


let user1 = gestorDeUsuarios.create({
  photo: "photojorge.jpg",
  email: "jorge18@gmail.com",
  password: "Passjorge",
}); // crear un nuevo usuario
let user2 = gestorDeUsuarios.create({
  photo: "photocarlos.jpg",
  email: "carlos17@gmail.com",
  password: "PassCarlos",
}); // crear un nuevo usuario
let user3 = gestorDeUsuarios.create({
  photo: "photoluis.jpg",
  email: "luis13@gmail.com",
  password: "Passluis",
}); // crear un nuevo usuario
let user4 = gestorDeUsuarios.create({
  photo: "photojuan.jpg",
  email: "juan701@gmail.com",
  password: "PassJuan",
}); // crear un nuevo usuario

console.log(gestorDeUsuarios.read());
console.log(gestorDeUsuarios.readOne(user1.id));
gestorDeUsuarios.destroy(user4.id);
user1 = gestorDeUsuarios.update(user1.id, {
  photo: "newphoto.jpg",
  email: "newemail@gmail.com",
  password: "newpassword"

})

console.log(user1);

