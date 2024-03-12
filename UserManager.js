class UserManager {
  static #users = [];

  create(data) {
    const user = {
      id:
        UserManager.#users.length === 0
          ? 1
          : UserManager.#users[UserManager.#users.length - 1].id + 1,
      photo: data.photo,
      email: data.email,
      password: data.password,
      role: 0,
    };
    UserManager.#users.push(user);
    console.log("usuario creado");
  }
  read() {
    return UserManager.#users;
  }
}
const usersManager = new UserManager();

usersManager.create({
  photo: "foto.jpg",
  email: "pabloserver@gmail.com",
  password: 1234,
  role: 1,
});
usersManager.create({
  photo: "foto01.jpg",
  email: "jorgeserver@gmail.com",
  password: 5678,
  role: 1,
});
console.log(usersManager.read());
