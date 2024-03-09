class ProductsManager {
    static #products = [];
  
    create(product) {
      const createdProduct = {
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
      ProductsManager.#products.push(createdProduct);
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
    stock: 1100,
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