import crypto from "crypto";

class CartsManager {
  static #carts = [];
  static #cartId = [];

  create(cart) {
    const cart = {
      id: data.id || crypto.randomBytes(12).toString("hex"),
      title: cart.title,
      photo:
        cart.photo ||
        "https://cdn-icons-png.flaticon.com/512/7466/7466065.png",
      category: cart.category || "without Category",
      price: cart.price || 1,
      stock: cart.stock || 1,
    };
    if (!data.title) {
      throw new Error("Title is required to create a cart");
    } else {
      CartsManager.#cartId.push(cart.id);
      CartsManager.#carts.push(cart);
      console.log("Created cart");
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
      console.log(within)
      console.log("cart DELETED");
      return cartToRemove;
    } catch (error) {
      throw error;
    }
  }
  update(id, newData) {
    try {
      const  cartToUpdate = this.readOne(id);

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
  title: "Cúrcuma en Polvo",
  photo: "curcuma.jpg",
  category: "suplementos",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Maca en Polvo",
  photo: "maca.jpg",
  category: "suplementos",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Tofu Orgánico",
  photo: "tofu.jpg",
  category: "proteinas",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Batata Orgánica",
  photo: "batata.jpg",
  category: "verduras",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Nueces de Brasil",
  photo: "nueces.jpg",
  category: "frutos secos",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Tempeh de Soja",
  photo: "tempeh.jpg",
  category: "proteinas",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Alcachofas en Conserva",
  photo: "alcachofas.jpg",
  category: "verduras",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Polen de Abeja",
  photo: "polen.jpg",
  category: "suplementos",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Sopa de Tomate Casera",
  photo: "sopa_tomate.jpg",
  category: "sopas",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Espaguetis de Calabacín",
  photo: "espaguetis_calabacin.jpg",
  category: "verduras",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Chips de Plátano Verde",
  photo: "platano_verde.jpg",
  category: "snacks",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Levadura Nutricional",
  photo: "levadura.jpg",
  category: "suplementos",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Kale Orgánico",
  photo: "kale.jpg",
  category: "verduras",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Pistachos",
  photo: "pistachos.jpg",
  category: "frutos secos",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Seitan Ahumado",
  photo: "seitan.jpg",
  category: "proteinas",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Sopa de Lentejas",
  photo: "sopa_lentejas.jpg",
  category: "sopas",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Té Verde Matcha",
  photo: "te_matcha.jpg",
  category: "bebidas",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Granola Casera",
  photo: "granola.jpg",
  category: "cereales",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Aguacates Hass",
  photo: "aguacate.jpg",
  category: "frutas",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Chucrut Casero",
  photo: "chucrut.jpg",
  category: "fermentados",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Almendras Crudas",
  photo: "almendras.jpg",
  category: "frutos secos",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Hummus Casero",
  photo: "hummus.jpg",
  category: "snacks",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Salsa de Tomate",
  photo: "salsa_tomate.jpg",
  category: "condimentos",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Té de Jengibre",
  photo: "te_jengibre.jpg",
  category: "bebidas",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Chips de Kale",
  photo: "kale_chips.jpg",
  category: "snacks",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Quinoa Orgánica",
  photo: "quinoa.jpg",
  category: "cereales",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Crema de Almendras",
  photo: "crema_almendras.jpg",
  category: "frutos secos",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Champiñones Portobello",
  photo: "champinones.jpg",
  category: "verduras",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Sopa de Calabaza",
  photo: "sopa_calabaza.jpg",
  category: "sopas",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Tortitas de Maíz",
  photo: "tortitas_maiz.jpg",
  category: "snacks",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Aceite de Coco Virgen",
  photo: "aceite_coco.jpg",
  category: "condimentos",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Té de Hibisco",
  photo: "te_hibisco.jpg",
  category: "bebidas",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Sopa de Verduras",
  photo: "sopa_verduras.jpg",
  category: "sopas",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Mantequilla de Almendras",
  photo: "mantequilla_almendras.jpg",
  category: "frutos secos",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Té de Menta",
  photo: "te_menta.jpg",
  category: "bebidas",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Salsa de Soja Orgánica",
  photo: "salsa_soja.jpg",
  category: "condimentos",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Harina de Almendras",
  photo: "harina_almendras.jpg",
  category: "harinas",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Galletas de Avena y Pasas",
  photo: "galletas_avena.jpg",
  category: "snacks",
  price: 1500,
  stock: 10,
});

cartsManager.create({
  title: "Vinagre de Manzana Orgánico",
  photo: "vinagre_manzana.jpg",
  category: "condimentos",
  price: 1500,
  stock: 10,
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
