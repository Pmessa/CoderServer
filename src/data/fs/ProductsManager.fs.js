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
      photo: "https://images.hola.com/imagenes/cocina/noticiaslibros/20200525168692/curcuma-polvo-infusion-capsulas-mejor-opcion/0-976-647/curcuma-adobe-t.jpg?tx=w_1200",
      category: "suplementos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Maca en Polvo",
      photo: "https://http2.mlstatic.com/D_NQ_NP_605365-MLA75036396803_032024-O.webp",
      category: "suplementos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Tofu Orgánico",
      photo: "https://http2.mlstatic.com/D_NQ_NP_2X_934310-MLA71639100335_092023-F.webp",
      category: "proteinas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Batata Orgánica",
      photo: "https://www.picturethisai.com/image-handle/website_cmsname/image/1080/154214756469702658.jpeg?x-oss-process=image/format,webp",
      category: "verduras",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Nueces de Brasil",
      photo: "https://belleza-estetica.com.ar/wp-content/uploads/2024/02/propiedades_de_las_nueces_de_brasil_para_adelgazar_y_como_tomarlas_46332_orig.jpg",
      category: "frutos secos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Tempeh de Soja",
      photo: "https://www.conasi.eu/blog/wp-content/uploads/2015/09/Sliced_tempeh.jpg",
      category: "proteinas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Alcachofas en Conserva",
      photo: "",
      category: "verduras",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Polen de Abeja",
      photo: "",
      category: "suplementos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Sopa de Tomate Casera",
      photo: "",
      category: "sopas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Espaguetis de Calabacín",
      photo: "",
      category: "verduras",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Chips de Plátano Verde",
      photo: "",
      category: "snacks",
      price: 1500,
      stock: 10,
    });
    await productsManager.create({
      title: "Chips de Garbanzos",
      photo: "",
      category: "snacks",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Levadura Nutricional",
      photo: "",
      category: "suplementos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Kale Orgánico",
      photo: "",
      category: "verduras",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Pistachos",
      photo: "",
      category: "frutos secos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Seitan Ahumado",
      photo: "",
      category: "proteinas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Sopa de Lentejas",
      photo: "",
      category: "sopas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Té Verde Matcha",
      photo: "",
      category: "bebidas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Granola Casera",
      photo: "",
      category: "cereales",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Aguacates Hass",
      photo: "",
      category: "frutas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Chucrut Casero",
      photo: "",
      category: "fermentados",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Almendras Crudas",
      photo: "",
      category: "frutos secos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Hummus Casero",
      photo: "",
      category: "snacks",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Salsa de Tomate",
      photo: "",
      category: "condimentos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Té de Jengibre",
      photo: "",
      category: "bebidas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Chips de Kale",
      photo: "",
      category: "snacks",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Quinoa Orgánica",
      photo: "",
      category: "cereales",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Crema de Almendras",
      photo: "",
      category: "frutos secos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Champiñones Portobello",
      photo: "",
      category: "verduras",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Sopa de Calabaza",
      photo: "",
      category: "sopas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Tortitas de Maíz",
      photo: "",
      category: "snacks",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Aceite de Coco Virgen",
      photo: "",
      category: "condimentos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Té de Hibisco",
      photo: "",
      category: "bebidas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Sopa de Verduras",
      photo: "",
      category: "sopas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Mantequilla de Almendras",
      photo: "",
      category: "frutos secos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Té de Menta",
      photo: "",
      category: "bebidas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Salsa de Soja Orgánica",
      photo: "",
      category: "condimentos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Harina de Almendras",
      photo: "",
      category: "harinas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Galletas de Avena y Pasas",
      photo: "",
      category: "snacks",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Vinagre de Manzana Orgánico",
      photo: "",
      category: "condimentos",
      price: 1500,
      stock: 10,
    });
  } catch (error) {
    console.log(error);
  }
}

test();