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
      console.log("archivo creado");
    } else {
      console.log("Archivo ya existe");
    }
  }

  async create(data) {
    try {
      if (!data.title || !data.category || !data.price) {
        const error = new Error(
          "Por favor, complete todos los campos del producto para crearlo"
        );
        throw error;
      } else {
        const newProduct = {
          id: data.id || crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo:
            data.photo ||
            "https://media.istockphoto.com/id/1191485264/es/foto/lindo-cachorro-reci%C3%A9n-nacido-de-mini-cerdo-sentado-en-las-manos-del-ser-humano.jpg?s=1024x1024&w=is&k=20&c=LQc8dhebSNo2u5VOtXWEFrp0FCO8AD1CxUepyEzAHmY=",
          category: data.category,
          price: parseInt(data.price),
          stock: parseInt(data.stock) || 0,
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
          console.log("Producto creado:", newProduct.title);
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
        all.json.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        return one;
      } else {
        const error = new Error("Not found");
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
      let one = all.find((each) => each.id === id);
      if (!one) {
        throw new Error(`EL ID: ${id} A ELIMINAR NO SE ENCONTRÓ`);
      } else {
        let filtered = all.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        return one;
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
      title: `PRODUCTO N°1`,
      photo: ``,
      category: `firstCategory`,
      price: 1500,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°2`,
      photo: `UNA_FOTO.jgp`,
      category: `firstCategory`,
      price: 1200,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°3`,
      photo: `UNA_FOTO.jgp`,
      category: `firstCategory`,
      price: 195,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°4`,
      photo: `UNA_FOTO.jgp`,
      category: `secondCategory`,
      price: 2500,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°5`,
      photo: `UNA_FOTO.jgp`,
      category: `secondCategory`,
      price: 2600,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°6`,
      photo: `UNA_FOTO.jpg`,
      category: `secondCategory`,
      price: 3500,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°7`,
      photo: `UNA_FOTO.jpg`,
      category: `secondCategory`,
      price: 1350,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°8`,
      photo: `UNA_FOTO.jpg`,
      category: `secondCategory`,
      price: 1600,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°9`,
      photo: `UNA_FOTO.jpg`,
      category: `thirdCategory`,
      price: 1250,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°10`,
      photo: `UNA_FOTO.jpg`,
      category: `thirdCategory`,
      price: 3500,
      stock: 10,
    });
    await productsManager.create({
      title: "PRODUCTO N°11",
      photo: `UNA_FOTO.jpg`,
      category: `thirdCategory`,
      price: 1300,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°12`,
      photo: `UNA_FOTO.jpg`,
      category: `thirdCategory`,
      price: 1000,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°13`,
      photo: `UNA_FOTO.jpg`,
      category: `fourthCategory`,
      price: 1340,
      stock: 10,
    });

    await productsManager.create({
      title: `PRODUCTO N°14`,
      photo: `UNA_FOTO.jpg`,
      category: `fourthCategory`,
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: `PRODUCTO N°15`,
      photo: `UNA_FOTO.jpg`,
      category: `fourthCategory`,
      price: 1550,
      stock: 10,
    });

    await productsManager.create({
      title: `PRODUCTO N°16`,
      photo: `UNA_FOTO.jpg`,
      category: `fifthCategory`,
      price: 1150,
      stock: 10,
    });

    await productsManager.create({
      title: `PRODUCTO N°17`,
      photo: `UNA_FOTO.jgp`,
      category: `fifthCategory`,
      price: 1950,
      stock: 15,
    });
    await productsManager.create({
      title: `PRODUCTO N°18`,
      photo: `UNA_FOTO.jpg`,
      category: `fifthCategory`,
      price: 1200,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°19`,
      photo: `UNA_FOTO.jpg`,
      category: `fifthCategory`,
      price: 1100,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°20`,
      photo: `UNA_FOTO.jpg`,
      category: `fifthCategory`,
      price: 1500,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°21`,
      photo: ``,
      category: `firstCategory`,
      price: 1500,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°22`,
      photo: `UNA_FOTO.jgp`,
      category: `firstCategory`,
      price: 1200,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°23`,
      photo: `UNA_FOTO.jgp`,
      category: `firstCategory`,
      price: 195,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°24`,
      photo: `UNA_FOTO.jgp`,
      category: `secondCategory`,
      price: 2500,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°25`,
      photo: `UNA_FOTO.jgp`,
      category: `secondCategory`,
      price: 2600,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°26`,
      photo: `UNA_FOTO.jpg`,
      category: `secondCategory`,
      price: 3500,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°27`,
      photo: `UNA_FOTO.jpg`,
      category: `secondCategory`,
      price: 1350,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°28`,
      photo: `UNA_FOTO.jpg`,
      category: `secondCategory`,
      price: 1600,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°29`,
      photo: `UNA_FOTO.jpg`,
      category: `thirdCategory`,
      price: 1250,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°30`,
      photo: `UNA_FOTO.jpg`,
      category: `thirdCategory`,
      price: 3500,
      stock: 10,
    });
    await productsManager.create({
      title: "PRODUCTO N°31",
      photo: `UNA_FOTO.jpg`,
      category: `thirdCategory`,
      price: 1300,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°32`,
      photo: `UNA_FOTO.jpg`,
      category: `thirdCategory`,
      price: 1000,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°33`,
      photo: `UNA_FOTO.jpg`,
      category: `fourthCategory`,
      price: 1340,
      stock: 10,
    });

    await productsManager.create({
      title: `PRODUCTO N°34`,
      photo: `UNA_FOTO.jpg`,
      category: `fourthCategory`,
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: `PRODUCTO N°35`,
      photo: `UNA_FOTO.jpg`,
      category: `fourthCategory`,
      price: 1550,
      stock: 10,
    });

    await productsManager.create({
      title: `PRODUCTO N°36`,
      photo: `UNA_FOTO.jpg`,
      category: `fifthCategory`,
      price: 1150,
      stock: 10,
    });

    await productsManager.create({
      title: `PRODUCTO N°37`,
      photo: `UNA_FOTO.jgp`,
      category: `fifthCategory`,
      price: 1950,
      stock: 15,
    });
    await productsManager.create({
      title: `PRODUCTO N°38`,
      photo: `UNA_FOTO.jpg`,
      category: `fifthCategory`,
      price: 1200,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°39`,
      photo: `UNA_FOTO.jpg`,
      category: `fifthCategory`,
      price: 1100,
      stock: 10,
    });
    await productsManager.create({
      title: `PRODUCTO N°40`,
      photo: `UNA_FOTO.jpg`,
      category: `fifthCategory`,
      price: 1500,
      stock: 10,
    });
  } catch (error) {
    console.log(error);
  }
}

test();
