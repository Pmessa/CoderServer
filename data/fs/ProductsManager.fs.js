const fs = require("fs");
const crypto = require("crypto");

class ProductsManager {
  constructor() {
    this.path = "./fs/files/products.json";
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
      if (!data.title||!data.category||!data.price||!data.stock) {
        const error = new Error("Por favor, complete todos los campos del producto para crearlo");
        throw error;
      } else {
        const newProduct = {
          id: data.id || crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo:
            data.photo ||
            `"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826&t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27" `,
          category: data.category,
          price: data.price,
          stock: data.stock,
        };
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);
        all.push(newProduct);
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        console.log("created");
        return newProduct;
      }
    } catch (error) {
      throw error;
    }
  }

  async read() {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      console.log(all);
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
      if (!one) {
        throw new Error(`EL ID: ${id} NO SE ENCONTRÓ`);
      } else {
        console.log(`EL ID: ${id} SE EJECUTO readOne`);
        console.log(one)
        return one;
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
        console.log(`EL ID: ${id} HA SIDO ELIMINADO`);
        return one ;
      }
    } catch (error) {
      throw error;
    }
  }
}

const product = new ProductsManager();

async function test() {
  try {
    const product = new ProductsManager();
    await product.create({
      title: `TOFU`,
      photo: `"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826&t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27" `,
      category: `tofu`,
      price: 150,
      stock: 1000,
    });
    await product.create({
      title: `MANÍ`,
      photo: "maní.jpg",
      category: `frutos secos`,
      price: 150,
      stock: 3000,
    });
    await product.create({
      title: `ACEITE DE OLIVA`,
      photo: "aceiteDeOliva.jpg",
      category: `aceites`,
      price: 150,
      stock: 11000,
    });
    await product.create({
      title: `ACEITE DE LINO`,
      photo: "aceite de lino.jpg",
      category: `aceites`,
      price: 15000,
      stock: 10,
    });
    await product.create({
      title: `QUINOA`,
      photo: "quinoa.jpg",
      category: `untables`,
      price: 15000,
      stock: 10,
    });
    await product.create({
      title: `ALMENDRAS`,
      photo: "almendras.jpg",
      category: `Frutos secos`,
      price: 15000,
      stock: 10,
    });
    await product.create({
      title: `GIRASOL`,
      photo: "girasoles.jpg",
      category: `semillas`,
      price: 15000,
      stock: 10,
    });
    await product.create({
      title: `CHIA`,
      photo: "semillaDeChia.jpg",
      category: `semillas`,
      price: 10000,
      stock: 10,
    });
    await product.create({
      title: `NUEZ PECAN`,
      photo: "nueces.jpg",
      category: `furtos secos`,
      price: 13000,
      stock: 10,
    });
    await product.create({
      title: `MANTEQUILLA DE MANÍ`,
      photo: "mantequilla_maní.jpg",
      category: `untable`,
      price: 15000,
      stock: 10,
    });
    //await product.read();
    await product.readOne(`db6ae5847d36727eda12b9c4`);
    await product.destroy(`db6ae5847d36727eda12b9c4`);
    await product.readOne(`E57EN0EX157E`);
    //await product.readOne(`263b6b7fcb97d7618d3c1b2b`);

  } catch (error) {
    console.log(error);
  }
}
test();
