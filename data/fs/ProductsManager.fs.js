import fs from "fs";

import crypto from "crypto";

class ProductsManager {
  constructor() {
    this.path = "./data/fs/files/products.json";
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
          console.log("Este producto ya existe. Omitiendo la inserción.");
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
        console.log(one);
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
    //await product.read();
    // await product.readOne(`db6ae5847d36727eda12b9c4`);
    // await product.destroy(`db6ae5847d36727eda12b9c4`);
    // await product.readOne(`E57EN0EX157E`);
    //await product.readOne(`263b6b7fcb97d7618d3c1b2b`);
  } catch (error) {
    console.log(error);
  }
}

test();

// // crypto se utiliza para crear ids aleatorios hexadecimales con id:crypto.randomBytes(12).toString('hex').
// const crypto = require('crypto');
// //path es la ruta donde se creará el archivo JSON
// const path = "./data/fs/files/products.json";
// //Este condicional evalúa si exixte el archivo JSON, si no existe crea un array vacío [].
// if (!fs.existsSync(path)) {
//   const array = JSON.stringify([]);
//   fs.writeFileSync(path, array);
// }
// //products convierte los datos del array en objetos
// const products = JSON.parse(fs.readFileSync(path, "utf-8"));

// //product_1 construye los productos
// const product_1 = {
//   "NUEVO PRODUCTO 1": {  id:crypto.randomBytes(12).toString('hex'), title:"Vegan Food 1" , photo:"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826&t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27", category:"Vegan", price:1500, stock:20 },
//   "NUEVO PRODUCTO 2": {  id:crypto.randomBytes(12).toString('hex'), title:"Vegan Food 2" , photo:"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826&t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27", category:"Vegan", price:1500, stock:20 },
//   "NUEVO PRODUCTO 3": {  id:crypto.randomBytes(12).toString('hex'), title:"Vegan Food 3" , photo:"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826&t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27", category:"Vegan", price:1500, stock:20 },
//   "NUEVO PRODUCTO 4": {  id:crypto.randomBytes(12).toString('hex'), title:"Vegan Food 4" , photo:"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826&t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27", category:"Vegan", price:1500, stock:20 },
//   "NUEVO PRODUCTO 5": {  id:crypto.randomBytes(12).toString('hex'), title:"Vegan Food 5" , photo:"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826&t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27", category:"Vegan", price:1500, stock:20 },
//   "NUEVO PRODUCTO 6": {  id:crypto.randomBytes(12).toString('hex'), title:"Vegan Food 6" , photo:"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826&t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27", category:"Vegan", price:1500, stock:20 },
//   "NUEVO PRODUCTO 7": {  id:crypto.randomBytes(12).toString('hex'), title:"Vegan Food 7" , photo:"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826&t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27", category:"Vegan", price:1500, stock:20 },
//   "NUEVO PRODUCTO 8": {  id:crypto.randomBytes(12).toString('hex'), title:"Vegan Food 8" , photo:"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826&t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27", category:"Vegan", price:1500, stock:20 },
//   "NUEVO PRODUCTO 9": {  id:crypto.randomBytes(12).toString('hex'), title:"Vegan Food 9" , photo:"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826&t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27", category:"Vegan", price:1500, stock:20 },
//   "NUEVO PRODUCTO 10": {  id:crypto.randomBytes(12).toString('hex'), title:"Vegan Food 10" , photo:"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826&t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27", category:"Vegan", price:1500, stock:20 },
// };
// //products.push envía los productos creados dentro del array productString
// products.push(product_1);
// //productString vuelve a formato JSON, lo transforma a texto plano.
// const productString = JSON.stringify(products, null, 3);

// fs.writeFileSync(path, productString);

// //luego de hacer todo lo anterior se borra con fs.unlink
// console.log(productString);

// fs.unlinkSync(path)
