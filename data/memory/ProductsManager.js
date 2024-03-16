
const crypto = require('crypto');

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
        product.photo === `` ||
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
         id:product.id || crypto.randomBytes(12).toString('hex'),
  
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
  id:1,
  title: `MANTEQUILLA DE MANÍ`,
  photo: "mantequilla_maní.jpg",
  category: `untable`,
  price: 15000,
  stock: 10,
});
productManager.create({
  id:2,
  title: `NUEZ PECAN`,
  photo: "nueces.jpg",
  category: `furtos secos`,
  price: 13000,
  stock: 10,
});
productManager.create({
  title: `CHIA`,
  photo: "semillaDeChia.jpg",
  category: `semillas`,
  price: 10000,
  stock: 10,
});
productManager.create({
  title: `GIRASOL`,
  photo: "girasoles.jpg",
  category: `semillas`,
  price: 15000,
  stock: 10,
});

productManager.create({
  title: `ALMENDRAS`,
  photo: "almendras.jpg",
  category: `Frutos secos`,
  price: 15000,
  stock: 10,
});

productManager.create({
  title: `TOFU`,
  photo: `"https://img.freepik.com/foto-gratis/vista-superior-arreglo-vegetal-forma-corazon_23-2148287518.jpg?w=826&t=st=1710260892~exp=1710261492~hmac=630fd8a56369a2ed0c45d9fdaaa2b19f80b9e4c4dddc2eb0ccc43f4ea6d52c27" `,
  category: `tofu`,
  price: 150,
  stock: 1000,
});

productManager.create({
  title: `MANÍ`,
  photo: "maní.jpg",
  category: `frutos secos`,
  price: 150,
  stock: 3000,
});

productManager.create({
  title: `ACEITE DE OLIVA`,
  photo: "aceiteDeOliva.jpg",
  category: `aceites`,
  price: 150,
  stock: 11000,
});
productManager.create({
  title: `ACEITE DE LINO`,
  photo: "aceite de lino.jpg",
  category: `aceites`,
  price: 15000,
  stock: 10,
});
productManager.create({
  title: `QUINOA`,
  photo: "quinoa.jpg",
  category: `untables`,
  price: 15000,
  stock: 10,
});

// Mostrar todos los productos
console.log(productManager.read());

// Mostrar un producto específico por su ID
console.log(productManager.readOne(2));
//console.log(productManager.readOne(8));
// Eliminar productos por su ID
console.log(productManager.destroy(2));
console.log(productManager.readOne(2));
console.log(productManager.destroy(13));
