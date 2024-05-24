import crypto from "crypto";

class CartsManager {
  static #carts = [];
  static #cartId = [];

  create(cart) {
    const cart = {
      user_id: data.id || crypto.randomBytes(12).toString("hex"),
      product_id: data.id || crypto.randomBytes(12).toString("hex"),
      quantity: data.id || 1,
      state: data.id || "reserved",
    };
    if (!data.id) {
      throw new Error("Id is required to create a cart");
    } else {
      CartsManager.#cartId.push(cart.id);
      //CartsManager.#carts.push(cart);
      console.log("Created cart with memory");
      return cart;
    }
  }
  catch(error) {
    console.log(error);
  }

  read() {
    try {
      if (CartsManager.#carts.length === 0) {
        throw new Error("THERE ARE NO CARTS TO SHOW");
      } else {
        return CartsManager.#carts;
      }
    } catch (error) {
      console.log(error);
    }
  }
  readOne(id) {
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
  destroy(id) {
    try {
      const cartToRemove = this.readOne(id);
      const within = cartsManager.#carts.filter((each) => each.id !== id);
      cartsManager.#carts = within;
      console.log(within);
      console.log("cart DELETED");
      return cartToRemove;
    } catch (error) {
      throw error;
    }
  }
  update(id, newData) {
    try {
      const cartToUpdate = this.readOne(id);

      if (!cartToUpdate) {
        throw new Error("cart not found");
      }

      for (const prop in newData) {
        cartToUpdate[prop] = newData[prop];
      }

      return cartToUpdate;
    } catch (error) {
      throw error;
    }
  }
}

// Crear una instancia de ProducstManager
const cartsManager = new ProducstManager();

cartsManager.create({
  user_id: data.id,
  product_id: data.id,
  quantity: data.id || 1,
  state: data.id || "reserved",
});

// Mostrar todos los carts
console.log(cartsManager.read());

// Mostrar un cart específico por su ID
//console.log(cartManager.readOne(2));
//console.log(cartManager.readOne(8));
// Eliminar cartos por su ID
// console.log(cartManager.destroy(2));
// console.log(cartManager.readOne(2));
// console.log(cartManager.destroy(13));
