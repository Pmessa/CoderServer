import fs from "fs";
import crypto from "crypto";

class ProductsManager {
  constructor() {
    this.path = "./src/data/fs/files/products.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("created file");
    } else {
      console.log("File already exists");
    }
  }

  async create(data) {
    try {
      if (!data.title) {
        const error = new Error("YOU MUST ENTER THE PRODUCT TITLE");
        throw error;
      } else {
        const newProduct = {
          id: data.id || crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo:
            data.photo ||
            "https://media.istockphoto.com/id/1191485264/es/foto/lindo-cachorro-reci%C3%A9n-nacido-de-mini-cerdo-sentado-en-las-manos-del-ser-humano.jpg?s=1024x1024&w=is&k=20&c=LQc8dhebSNo2u5VOtXWEFrp0FCO8AD1CxUepyEzAHmY=",
          category: data.category || "without category",
          price: parseInt(data.price) || 1,
          stock: parseInt(data.stock) || 1,
        };

        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);

        // Verificar si el título del nuevo producto ya existe en la lista
        const isDuplicate = all.find(
          (product) => product.title === newProduct.title
        );
        if (isDuplicate) {
          //No hace nada
        } else {
          all.push(newProduct);

          all = JSON.stringify(all, null, 2);
          await fs.promises.writeFile(this.path, all);
          console.log("Product created:", newProduct.title);
        }
        
        return newProduct;
      }
    } catch (error) {
      throw error;
    }
  }
  async read(cat) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      cat && (all = all.filter((each) => each.category === cat));
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let one = all.find((each) => each.id === id);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      let all = await this.read();
      let one = all.find((each) => each.id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        return one;
      } else {
        const error = new Error("Not found!");
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
      let product = all.find((each) => each.id === id);
      if (product) {
        let filtered = all.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        return product;
      } else {
        const error = new Error("ID Not Found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

}

const productsManager = new ProductsManager();

export default productsManager;

async function test() {
  try {
    await productsManager.create({
      title: "Cúrcuma en Polvo",
      photo: "curcuma.jpg",
      category: "suplementos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Maca en Polvo",
      photo: "maca.jpg",
      category: "suplementos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Tofu Orgánico",
      photo: "tofu.jpg",
      category: "proteinas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Batata Orgánica",
      photo: "batata.jpg",
      category: "verduras",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Nueces de Brasil",
      photo: "nueces.jpg",
      category: "frutos secos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Tempeh de Soja",
      photo: "tempeh.jpg",
      category: "proteinas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Alcachofas en Conserva",
      photo: "alcachofas.jpg",
      category: "verduras",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Polen de Abeja",
      photo: "polen.jpg",
      category: "suplementos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Sopa de Tomate Casera",
      photo: "sopa_tomate.jpg",
      category: "sopas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Espaguetis de Calabacín",
      photo: "espaguetis_calabacin.jpg",
      category: "verduras",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Chips de Plátano Verde",
      photo: "platano_verde.jpg",
      category: "snacks",
      price: 1500,
      stock: 10,
    });
    await productsManager.create({
      title: "Chips de Garbanzos",
      photo: "garbanzos_especiados.jpg",
      category: "snacks",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Levadura Nutricional",
      photo: "levadura.jpg",
      category: "suplementos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Kale Orgánico",
      photo: "kale.jpg",
      category: "verduras",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Pistachos",
      photo: "pistachos.jpg",
      category: "frutos secos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Seitan Ahumado",
      photo: "seitan.jpg",
      category: "proteinas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Sopa de Lentejas",
      photo: "sopa_lentejas.jpg",
      category: "sopas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Té Verde Matcha",
      photo: "te_matcha.jpg",
      category: "bebidas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Granola Casera",
      photo: "granola.jpg",
      category: "cereales",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Aguacates Hass",
      photo: "aguacate.jpg",
      category: "frutas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Chucrut Casero",
      photo: "chucrut.jpg",
      category: "fermentados",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Almendras Crudas",
      photo: "almendras.jpg",
      category: "frutos secos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Hummus Casero",
      photo: "hummus.jpg",
      category: "snacks",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Salsa de Tomate",
      photo: "salsa_tomate.jpg",
      category: "condimentos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Té de Jengibre",
      photo: "te_jengibre.jpg",
      category: "bebidas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Chips de Kale",
      photo: "kale_chips.jpg",
      category: "snacks",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Quinoa Orgánica",
      photo: "quinoa.jpg",
      category: "cereales",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Crema de Almendras",
      photo: "crema_almendras.jpg",
      category: "frutos secos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Champiñones Portobello",
      photo: "champinones.jpg",
      category: "verduras",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Sopa de Calabaza",
      photo: "sopa_calabaza.jpg",
      category: "sopas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Tortitas de Maíz",
      photo: "tortitas_maiz.jpg",
      category: "snacks",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Aceite de Coco Virgen",
      photo: "aceite_coco.jpg",
      category: "condimentos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Té de Hibisco",
      photo: "te_hibisco.jpg",
      category: "bebidas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Sopa de Verduras",
      photo: "sopa_verduras.jpg",
      category: "sopas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Mantequilla de Almendras",
      photo: "mantequilla_almendras.jpg",
      category: "frutos secos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Té de Menta",
      photo: "te_menta.jpg",
      category: "bebidas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Salsa de Soja Orgánica",
      photo: "salsa_soja.jpg",
      category: "condimentos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Harina de Almendras",
      photo: "harina_almendras.jpg",
      category: "harinas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Galletas de Avena y Pasas",
      photo: "galletas_avena.jpg",
      category: "snacks",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Vinagre de Manzana Orgánico",
      photo: "vinagre_manzana.jpg",
      category: "condimentos",
      price: 1500,
      stock: 10,
    });
  } catch (error) {
    console.log(error);
  }
}

test();
