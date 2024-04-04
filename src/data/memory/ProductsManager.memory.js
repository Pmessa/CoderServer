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
const productsManager = new ProducstManager();


productsManager.create({
  title: 'Cúrcuma en Polvo',
  photo: 'curcuma.jpg',
  category: 'suplementos',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Maca en Polvo',
  photo: 'maca.jpg',
  category: 'suplementos',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Tofu Orgánico',
  photo: 'tofu.jpg',
  category: 'proteinas',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Batata Orgánica',
  photo: 'batata.jpg',
  category: 'verduras',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Nueces de Brasil',
  photo: 'nueces.jpg',
  category: 'frutos secos',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Tempeh de Soja',
  photo: 'tempeh.jpg',
  category: 'proteinas',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Alcachofas en Conserva',
  photo: 'alcachofas.jpg',
  category: 'verduras',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Polen de Abeja',
  photo: 'polen.jpg',
  category: 'suplementos',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Sopa de Tomate Casera',
  photo: 'sopa_tomate.jpg',
  category: 'sopas',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Espaguetis de Calabacín',
  photo: 'espaguetis_calabacin.jpg',
  category: 'verduras',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Chips de Plátano Verde',
  photo: 'platano_verde.jpg',
  category: 'snacks',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Levadura Nutricional',
  photo: 'levadura.jpg',
  category: 'suplementos',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Kale Orgánico',
  photo: 'kale.jpg',
  category: 'verduras',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Pistachos',
  photo: 'pistachos.jpg',
  category: 'frutos secos',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Seitan Ahumado',
  photo: 'seitan.jpg',
  category: 'proteinas',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Sopa de Lentejas',
  photo: 'sopa_lentejas.jpg',
  category: 'sopas',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Té Verde Matcha',
  photo: 'te_matcha.jpg',
  category: 'bebidas',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Granola Casera',
  photo: 'granola.jpg',
  category: 'cereales',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Aguacates Hass',
  photo: 'aguacate.jpg',
  category: 'frutas',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Chucrut Casero',
  photo: 'chucrut.jpg',
  category: 'fermentados',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Almendras Crudas',
  photo: 'almendras.jpg',
  category: 'frutos secos',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Hummus Casero',
  photo: 'hummus.jpg',
  category: 'snacks',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Salsa de Tomate',
  photo: 'salsa_tomate.jpg',
  category: 'condimentos',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Té de Jengibre',
  photo: 'te_jengibre.jpg',
  category: 'bebidas',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Chips de Kale',
  photo: 'kale_chips.jpg',
  category: 'snacks',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Quinoa Orgánica',
  photo: 'quinoa.jpg',
  category: 'cereales',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Crema de Almendras',
  photo: 'crema_almendras.jpg',
  category: 'frutos secos',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Champiñones Portobello',
  photo: 'champinones.jpg',
  category: 'verduras',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Sopa de Calabaza',
  photo: 'sopa_calabaza.jpg',
  category: 'sopas',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Tortitas de Maíz',
  photo: 'tortitas_maiz.jpg',
  category: 'snacks',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Aceite de Coco Virgen',
  photo: 'aceite_coco.jpg',
  category: 'condimentos',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Té de Hibisco',
  photo: 'te_hibisco.jpg',
  category: 'bebidas',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Sopa de Verduras',
  photo: 'sopa_verduras.jpg',
  category: 'sopas',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Mantequilla de Almendras',
  photo: 'mantequilla_almendras.jpg',
  category: 'frutos secos',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Té de Menta',
  photo: 'te_menta.jpg',
  category: 'bebidas',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Salsa de Soja Orgánica',
  photo: 'salsa_soja.jpg',
  category: 'condimentos',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Harina de Almendras',
  photo: 'harina_almendras.jpg',
  category: 'harinas',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Galletas de Avena y Pasas',
  photo: 'galletas_avena.jpg',
  category: 'snacks',
  price: 1500,
  stock: 10,
});

productsManager.create({
  title: 'Vinagre de Manzana Orgánico',
  photo: 'vinagre_manzana.jpg',
  category: 'condimentos',
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