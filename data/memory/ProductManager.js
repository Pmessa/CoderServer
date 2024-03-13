// Clase ProductManager para gestionar productos con métodos de creación, lectura y eliminación
class ProductManager {
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
        id:
          ProductManager.#products.length === 0
            ? 1
            : ProductManager.#products[ProductManager.#products.length - 1].id + 1,
        title: product.title,
        photo: product.photo,
        category: product.category,
        price: product.price,
        stock: product.stock,
      };
      // Agregar el nuevo producto al array de productos
      ProductManager.#products.push(newProduct);
      console.log("PRODUCTO CREADO");
    } catch (error) {
      console.log(error);
    }
  }

  // Método para mostrar todos los productos
  read() {
    try {
      if (ProductManager.#products.length === 0) {
        throw new Error("No hay productos para mostrar");
      }
      return ProductManager.#products;
    } catch (error) {
      console.log(error);
    }
  }

  // Método para mostrar un producto específico por su ID
  readOne(id) {
    try {
      const product = ProductManager.#products.find((p) => p.id === id);
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
      const without = ProductManager.#products.filter((each) => each.id !== id);
      ProductManager.#products = without; // Actualizar el array de productos
      console.log("PRODUCTO ELIMINADO");
    } catch (error) {
      console.log(error);
    }
  }
}

// Crear una instancia de ProductManager
const productManager = new ProductManager();

// Crear los productos
productManager.create({
  title: `MANTEQUILLA DE MANÍ`,
  photo: "mantequilla_maní.jpg",
  category: `untables`,
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
  photo: "tofu.jpg",
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

// Mostrar todos los productos
console.log(productManager.read());

// Mostrar un producto específico por su ID
console.log(productManager.readOne(5));

// Eliminar productos por su ID
console.log(productManager.destroy(3));
console.log(productManager.destroy(13));
