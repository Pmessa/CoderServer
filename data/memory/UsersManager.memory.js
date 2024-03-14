class UsersManager {
  static #users = [];
  create(data) {
    try {
      const user = {
        id:
          UsersManager.#users.length === 0
            ? 1
            : UsersManager.#users[UsersManager.#users.length - 1].id + 1,
        photo: data.photo,
        email: data.email,
        password: data.password,
        role: 0,
      };
      if (!data.email || !data.password || !data.photo) {
        throw new Error("Email, password, and photo are required");
      } else UsersManager.#users.push(user);
      console.log("usuario creado");
    } catch (error) {
      console.log(error);
    }
  }
  read() {
    try {
      if (UsersManager.#users.length === 0) {
        throw new Error("NO HAY USUARIOS");
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
        throw new Error("NO EXISTE EL USUARIO");
      } else {
        return one;
      }
    } catch (error) {
      console.log(error);
    }
  }
  destroy(id) {
    try {
      this.readOne(id);
      const userToRemove = UsersManager.#users.filter((each) => each.id !== id);
      UsersManager.#users = userToRemove;
      console.log("USUARIO ELIMINADO");
      } catch (error) {
      console.log(error);
    }
  }  

}
const gestorDeUsuarios = new UsersManager();

gestorDeUsuarios.create({
  photo: "photojorge.jpg",
  email: "jorge18@gmail.com",
  password: "Passjorge",
}); // crear un nuevo usuario
gestorDeUsuarios.create({
  photo: "photocarlos.jpg",
  email: "carlos17@gmail.com",
  password: "PassCarlos",
}); // crear un nuevo usuario

console.log(gestorDeUsuarios.read());
console.log(gestorDeUsuarios.readOne(1));
gestorDeUsuarios.destroy(24);
