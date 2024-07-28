import crypto from "crypto";

class ProductsManager {
  static #products = [];
  //static #productId = [];

  async create(data) {
    /* const newProduct = {
      id: data.id || crypto.randomBytes(12).toString("hex"),
      title: data.title,
      photo:
        data.photo ||
        "https://cdn-icons-png.flaticon.com/512/7466/7466065.png",
      category: data.category || "without Category",
      price: data.price || 1,
      stock: data.stock || 1,
    }; */
    try {
      //if (!data.title) {

      

      //  throw new Error("Title is required to create a product");
      //} else {
        //newProduct.id = newProduct.id || crypto.randomBytes(12).toString("hex");
        const one = data
        ProductsManager.#products.push(data);
        //ProductsManager.#productId.push(newProduct.id);
        console.log("Created Product with Memory File");
        return one;
      }
     catch (error) {
      throw error;
    }
  }

  async read(filter) {
    try {
      if (ProductsManager.#products.length === 0) {
        const error = new Error("NOT FOUND");
        error.statusCode = 404;
        throw error;
      } else {
        if (filter) {
          const all = ProductsManager.#products.filter(
            (prod) => prod.category === filter
          );
          if (!all) {
            const error = new Error("NOT FOUND");
            error.statusCode = 404;
            throw error;
          }
          return all;
        } else {
          const all = ProductsManager.#products;
          return all;
        }
      }
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const one = ProductsManager.#products.find((each) => each.id === id);
      if (!one) {
        throw new Error("THE PRODUCT DOES NOT EXIST");
      } else {
        return one;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async paginate({ filter, opts }) {
    try {
      let products = await this.read();
      if (filter.category) {
        products = products.filter((product) =>
          product.category.includes(filter.category)
        );
      }
      const page = opts.page || 1;
      const limit = opts.limit || 10;
      const skip = (page - 1) * limit;
      const paginatedProducts = products.slice(skip, skip + limit);
      const totalDocs = products.length;
      if (totalDocs === 0) {
        const error = new Error("There aren't any documents");
        error.statusCode = 404;
        throw error;
      }
      const all = {
        docs: paginatedProducts,
        totalDocs,
        limit,
        page,
        totalPages: Math.ceil(totalDocs / limit),
      };
      return all;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const one = this.readOne(id);
      const within = ProductsManager.#products.filter((each) => each.id !== id);
      ProductsManager.#products = within;
      console.log(within);
      console.log("PRODUCT DELETED");
      return one;
    } catch (error) {
      throw error;
    }
  }
  update(id, data) {
    try {
      const one = this.readOne(id);

      if (!one) {
        throw new Error("Product not found");
      }

      for (const prop in newData) {
        one[prop] = data[prop];
      }

      return one;
    } catch (error) {
      throw error;
    }
  }
}

const productsManager = new ProductsManager();
export default productsManager;
/* productsManager.create({
  title: `Manteca de maní`,
  photo: "mantequilla.jpg",
  category: `untable`,
  price: 2500,
  stock: 1000,
});
productsManager.create({
  title: `almendras`,
  photo: "almendras.jpg",
  category: `Frutos secos`,
  price: 15000,
  stock: 1000,
});
productsManager.create({
  title: `Tofu`,
  photo: "tofu.jpg",
  category: `tofu`,
  price: 150,
  stock: 1000,
});
productsManager.create({
  title: `maní`,
  photo: "maní.jpg",
  category: `frutos secos`,
  price: 150,
  stock: 3000,
});
productsManager.create({
  title: `Aceite de oliva`,
  photo: "aceiteDeOliva.jpg",
  category: `aceites`,
  price: 150,
  stock: 11000,
});

productsManager.create({
  title: "Cúrcuma en Polvo",
  photo: "curcuma.jpg",
  category: "suplementos",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Maca en Polvo",
  photo: "maca.jpg",
  category: "suplementos",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Tofu Orgánico",
  photo: "tofu.jpg",
  category: "proteinas",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Batata Orgánica",
  photo: "batata.jpg",
  category: "verduras",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Nueces de Brasil",
  photo: "nueces.jpg",
  category: "frutos secos",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Tempeh de Soja",
  photo: "tempeh.jpg",
  category: "proteinas",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Alcachofas en Conserva",
  photo: "alcachofas.jpg",
  category: "verduras",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Polen de Abeja",
  photo: "polen.jpg",
  category: "suplementos",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Sopa de Tomate Casera",
  photo: "sopa_tomate.jpg",
  category: "sopas",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Espaguetis de Calabacín",
  photo: "espaguetis_calabacin.jpg",
  category: "verduras",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Chips de Plátano Verde",
  photo: "platano_verde.jpg",
  category: "snacks",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Levadura Nutricional",
  photo: "levadura.jpg",
  category: "suplementos",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Kale Orgánico",
  photo: "kale.jpg",
  category: "verduras",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Pistachos",
  photo: "pistachos.jpg",
  category: "frutos secos",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Seitan Ahumado",
  photo: "seitan.jpg",
  category: "proteinas",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Sopa de Lentejas",
  photo: "sopa_lentejas.jpg",
  category: "sopas",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Té Verde Matcha",
  photo: "te_matcha.jpg",
  category: "bebidas",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Granola Casera",
  photo: "granola.jpg",
  category: "cereales",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Aguacates Hass",
  photo: "aguacate.jpg",
  category: "frutas",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Chucrut Casero",
  photo: "chucrut.jpg",
  category: "fermentados",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Almendras Crudas",
  photo: "almendras.jpg",
  category: "frutos secos",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Hummus Casero",
  photo: "hummus.jpg",
  category: "snacks",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Salsa de Tomate",
  photo: "salsa_tomate.jpg",
  category: "condimentos",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Té de Jengibre",
  photo: "te_jengibre.jpg",
  category: "bebidas",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Chips de Kale",
  photo: "kale_chips.jpg",
  category: "snacks",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Quinoa Orgánica",
  photo: "quinoa.jpg",
  category: "cereales",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Crema de Almendras",
  photo: "crema_almendras.jpg",
  category: "frutos secos",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Champiñones Portobello",
  photo: "champinones.jpg",
  category: "verduras",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Sopa de Calabaza",
  photo: "sopa_calabaza.jpg",
  category: "sopas",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Tortitas de Maíz",
  photo: "tortitas_maiz.jpg",
  category: "snacks",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Aceite de Coco Virgen",
  photo: "aceite_coco.jpg",
  category: "condimentos",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Té de Hibisco",
  photo: "te_hibisco.jpg",
  category: "bebidas",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Sopa de Verduras",
  photo: "sopa_verduras.jpg",
  category: "sopas",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Mantequilla de Almendras",
  photo: "mantequilla_almendras.jpg",
  category: "frutos secos",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Té de Menta",
  photo: "te_menta.jpg",
  category: "bebidas",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Salsa de Soja Orgánica",
  photo: "salsa_soja.jpg",
  category: "condimentos",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Harina de Almendras",
  photo: "harina_almendras.jpg",
  category: "harinas",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Galletas de Avena y Pasas",
  photo: "galletas_avena.jpg",
  category: "snacks",
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: "Vinagre de Manzana Orgánico",
  photo: "vinagre_manzana.jpg",
  category: "condimentos",
  price: 1500,
  stock: 10,
});

// Mostrar todos los productos
//console.log(productManager.read());

// Mostrar un producto específico por su ID
//console.log(productManager.readOne(2));
//console.log(productManager.readOne(8));
// Eliminar productos por su ID
// console.log(productManager.destroy(2));
// console.log(productManager.readOne(2));
// console.log(productManager.destroy(13));
 */
