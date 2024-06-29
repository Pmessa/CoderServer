import crypto from "crypto";

class CartsManager {
  static #carts = [];

  async create(data) {
    try {
      if (data.user_id && data.product_id) {
        const cart = {
          id: data.id || crypto.randomBytes(12).toString("hex"),
          user_id: data.user_id,
          product_id: data.product_id,
          quantity: data.quantity || 1,
          state: data.state || "reserved",
        };
        CartsManager.#carts.push(cart);
        return `cart was created succesfully, ID: ${cart.id}`;
      } else {
        throw new Error("Can not create file");
      }
    } catch (error) {
      throw error;
    }
  }

  async read(filter) {
    try {
      if (CartsManager.#carts.length === 0) {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      } else {
        if (filter) {
          const all = CartsManager.#carts.filter(
            (cart) => cart.user_id === filter
          );
          if (!all) {
            const error = new Error("NOT FOUND");
            error.statusCode = 404;
            throw error;
          }
          return all;
        } else {
          const all = CartsManager.#carts;
          return all;
        }
      }
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const one = CartsManager.#carts.find((each) => each.id === id);
      if (!one) {
        throw new Error("THE CART DOES NOT EXIST");
      } else {
        return one;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async destroy(id) {
    try {
      const one = this.readOne(id);
      const within = CartsManager.#carts.filter((each) => each.id !== id);
      CartsManager.#carts = within;
      //console.log(within);
      //console.log("cart DELETED");
      return one;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      const one = this.readOne(id);

      if (!onbeforeunload) {
        throw new Error("cart not found");
      }

      for (const prop in data) {
        one[prop] = data[prop];
      }

      return one;
    } catch (error) {
      throw error;
    }
  }
}

const cartsManager = new CartsManager();
export default cartsManager;

/* cartsManager.create({
  user_id: data.id,
  product_id: data.id,
  quantity: data.id || 1,
  state: data.id || "reserved",
}); */

// Mostrar todos los carts
//console.log(cartsManager.read());

// Mostrar un cart específico por su ID
//console.log(cartManager.readOne(2));
//console.log(cartManager.readOne(8));
// Eliminar cartos por su ID
// console.log(cartManager.destroy(2));
// console.log(cartManager.readOne(2));
// console.log(cartManager.destroy(13));
