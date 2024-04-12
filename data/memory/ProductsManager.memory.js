const crypto = require("crypto");

// Clase ProducstManager para gestionar productos con métodos de creación, lectura y eliminación
class ProducstManager {
  static #products = []; // Array privado para almacenar los productos

  // Método para crear un nuevo producto
  create(product) {
    try {
      // Validar que todos los campos del producto estén completos
      if (
        !product.title ||
        product.title === `` ||
        !product.photo ||
        product.photo === "https://media.istockphoto.com/id/1191485264/es/foto/lindo-cachorro-reci%C3%A9n-nacido-de-mini-cerdo-sentado-en-las-manos-del-ser-humano.jpg?s=1024x1024&w=is&k=20&c=LQc8dhebSNo2u5VOtXWEFrp0FCO8AD1CxUepyEzAHmY= "||
        !product.category ||
        product.category === `` ||
        !product.price ||
        product.price === `` ||
        !product.stock ||
        product.title === ``
      ) {
        throw new Error("Por favor complete todos los campos del producto");
      }
      // Crear un nuevo producto con un ID único e incremental
      const newProduct = {
        //id:crypto.randomBytes(12).toString('hex'),
        id: product.id || crypto.randomBytes(12).toString("hex"),

        // ProducstManager.#products.length === 0
        //   ? 1
        //   : ProducstManager.#products[ProducstManager.#products.length - 1]
        //       .id + 1,
        title: product.title,
        photo: product.photo,
        category: product.category,
        price: product.price,
        stock: product.stock,
      };
      // Agregar el nuevo producto al array de productos
      ProducstManager.#products.push(newProduct);
    } catch (error) {
      console.log(error);
    }
  }

  // Método para mostrar todos los productos
  read() {
    try {
      if (ProducstManager.#products.length === 0) {
        throw new Error("No hay productos para mostrar");
      }
      return ProducstManager.#products;
    } catch (error) {
      console.log(error);
    }
  }

  // Método para mostrar un producto específico por su ID
  readOne(id) {
    try {
      const product = ProducstManager.#products.find((p) => p.id === id);
      if (!product) {
        throw new Error(`Producto con ID ${id} no encontrado`);
      }
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  // Método para eliminar un producto por su ID
  destroy(id) {
    try {
      this.readOne(id); // Verificar si el producto existe
      // Filtrar el array de productos para excluir el producto con el ID dado
      const without = ProducstManager.#products.filter(
        (each) => each.id !== id
      );
      ProducstManager.#products = without; // Actualizar el array de productos
      console.log("PRODUCTO ELIMINADO");
    } catch (error) {
      console.log(error);
    }
  }
}

// Crear una instancia de ProducstManager
const productManager = new ProducstManager();

// Crear los productos
productManager.create({
  title: `PRODUCTO N°1`,
  photo: `UNA_FOTO.jgp`,
  category: `firstCategory`,
  price: 1500,
  stock: 10,
});
productManager.create({
  title: `PRODUCTO N°2`,
  photo: `UNA_FOTO.jgp`,
  category: `firstCategory`,
  price: 1200,
  stock: 10,
});
productManager.create({
  title: `PRODUCTO N°3`,
  photo: `UNA_FOTO.jgp`,
  category: `firstCategory`,
  price: 195,
  stock: 10,
});
productManager.create({
  title: `PRODUCTO N°4`,
  photo: `UNA_FOTO.jgp`,
  category: `secondCategory`,
  price: 2500,
  stock: 10,
});
productManager.create({
  title: `PRODUCTO N°5`,
  photo: `UNA_FOTO.jgp`,
  category: `secondCategory`,
  price: 2600,
  stock: 10,
});
productManager.create({
  title: `PRODUCTO N°6`,
  photo: `UNA_FOTO.jpg`,
  category: `secondCategory`,
  price: 3500,
  stock: 10,
});
productManager.create({
  title: `PRODUCTO N°7`,
  photo: `UNA_FOTO.jpg`,
  category: `secondCategory`,
  price: 1350,
  stock: 10,
});
productManager.create({
  title: `PRODUCTO N°8`,
  photo: `UNA_FOTO.jpg`,
  category: `secondCategory`,
  price: 1600,
  stock: 10,
});
productManager.create({
  title: `PRODUCTO N°9`,
  photo: `UNA_FOTO.jpg`,
  category: `thirdCategory`,
  price: 1250,
  stock: 10,
});
productManager.create({
  title: `PRODUCTO N°10`,
  photo: `UNA_FOTO.jpg`,
  category: `thirdCategory`,
  price: 3500,
  stock: 10,
});
productManager.create({
  title: "PRODUCTO N°11",
  photo: `UNA_FOTO.jpg`,
  category: `thirdCategory`,
  price: 1300,
  stock: 10,
});
``;
productManager.create({
  title: `PRODUCTO N°12`,
  photo: `UNA_FOTO.jpg`,
  category: `thirdCategory`,
  price: 1000,
  stock: 10,
});
productManager.create({
  title: `PRODUCTO N°13`,
  photo: `UNA_FOTO.jpg`,
  category: `fourthCategory`,
  price: 1340,
  stock: 10,
});

productManager.create({
  title: `PRODUCTO N°14`,
  photo: `UNA_FOTO.jpg`,
  category: `fourthCategory`,
  price: 1500,
  stock: 10,
});

productManager.create({
  title: `PRODUCTO N°15`,
  photo: `UNA_FOTO.jpg`,
  category: `fourthCategory`,
  price: 1550,
  stock: 10,
});

productManager.create({
  title: `PRODUCTO N°16`,
  photo: `UNA_FOTO.jpg`,
  category: `fifthCategory`,
  price: 1150,
  stock: 10,
});

productManager.create({
  title: `PRODUCTO N°17`,
  photo: `UNA_FOTO.jgp`,
  category: `fifthCategory`,
  price: 1950,
  stock: 15,
});
productManager.create({
  title: `PRODUCTO N°18`,
  photo: `UNA_FOTO.jpg`,
  category: `fifthCategory`,
  price: 1200,
  stock: 10,
});
productManager.create({
  title: `PRODUCTO N°19`,
  photo: `UNA_FOTO.jpg`,
  category: `fifthCategory`,
  price: 1100,
  stock: 10,
});
productManager.create({
  title: `PRODUCTO N°20`,
  photo: `UNA_FOTO.jpg`,
  category: `fifthCategory`,
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
