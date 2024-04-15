
class ProductsManager {
    static #products = [];
  
    create(product) {
      const user = {
        id:
          ProductsManager.#products.length === 0
            ? 1
            : ProductsManager.#products[ProductsManager.#products.length - 1].id +
              1,

        title: product.title,
        photo: product.photo,
        category: product.category,
        price: product.price,
        stock: product.stock,
      };

      ProductsManager.#products.push(user);
      console.log("usuario creado");
    }
    read() {
      return ProductsManager.#products;
    }
  }
  const productManager = new ProductsManager();
  
  productManager.create({
    title: `Manteca de maní`,
    photo: "mantequilla.jpg",
    category: `untable`,
    price: 2500,
    stock: 1000,
  });
  productManager.create({
    title: `almendras`,
    photo: "almendras.jpg",
    category: `Frutos secos`,
    price: 15000,
    stock: 1000,
  });
  productManager.create({
    title: `Tofu`,
    photo: "tofu.jpg",
    category: `tofu`,
    price: 150,
    stock: 1000,
  });
  productManager.create({
    title: `maní`,
    photo: "maní.jpg",
    category: `frutos secos`,
    price: 150,
    stock: 3000,
  });
  productManager.create({
    title: `Aceite de oliva`,
    photo: "aceiteDeOliva.jpg",
    category: `aceites`,
    price: 150,
    stock: 11000,
  });
  console.log(productManager.read());
      // Agregar el nuevo producto al array de productos
      ProducstManager.#products.push(newProduct);
    } catch (error) {
      console.log(error);
    }
  }


      ProductsManager.#products.push(user);
      console.log("usuario creado");
    }
    read() {
      return ProductsManager.#products;
    }
  }
  const productManager = new ProductsManager();
  
  productManager.create({
    title: `Manteca de maní`,
    photo: "mantequilla.jpg",
    category: `untable`,
    price: 2500,
    stock: 1000,
  });
  productManager.create({
    title: `almendras`,
    photo: "almendras.jpg",
    category: `Frutos secos`,
    price: 15000,
    stock: 1000,
  });
  productManager.create({
    title: `Tofu`,
    photo: "tofu.jpg",
    category: `tofu`,
    price: 150,
    stock: 1000,
  });
  productManager.create({
    title: `maní`,
    photo: "maní.jpg",
    category: `frutos secos`,
    price: 150,
    stock: 3000,
  });
  productManager.create({
    title: `Aceite de oliva`,
    photo: "aceiteDeOliva.jpg",
    category: `aceites`,
    price: 150,
    stock: 11000,
  });
  console.log(productManager.read());

    }
    read() {
      return ProductsManager.#products;
    }
  }

  const productManager = new ProductsManager();
  
  productManager.create({
    title: `Manteca de maní`,
    photo: "mantequilla.jpg",
    category: `untable`,
    price: 2500,
    stock: 1000,
  });
  productManager.create({
    title: `almendras`,
    photo: "almendras.jpg",
    category: `Frutos secos`,
    price: 15000,
    stock: 1000,
  });
  productManager.create({
    title: `Tofu`,
    photo: "tofu.jpg",
    category: `tofu`,
    price: 150,
    stock: 1000,
  });
  productManager.create({
    title: `maní`,
    photo: "maní.jpg",
    category: `frutos secos`,
    price: 150,
    stock: 3000,
  });
  productManager.create({
    title: `Aceite de oliva`,
    photo: "aceiteDeOliva.jpg",
    category: `aceites`,
    price: 150,
    stock: 11000,
  });
  console.log(productManager.read());
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

