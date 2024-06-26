import fs from "fs";
import crypto from "crypto";

class ProductsManager {
  constructor() {
    this.path = "./src/dao/fs/files/products.json";
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
    /* if (!data.title || data.title.trim() === "") {
      console.log("Please enter the product title to create it");
      return null;
    } */
    try {
      /* const newProduct = {
        id: data.id || crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo:
          data.photo ||
          "https://www.grandespymes.com.ar/wp-content/uploads/2020/10/nuevo-producto-830x518.jpg",
        category: data.category || "without category",
        price: parseInt(data.price) || 1,
        stock: parseInt(data.stock) || 1,
      };
 */
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      all.push(data);
      all = JSON.stringify(all, null, 2);
      await fs.promises.writeFile(this.path, allProd);
      console.log("Product created successfully");
      return data;
    } catch (error) {
      throw error;
    }
  }
  async read(filter) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      if (filter) {
        all = all.filter((each) => each.category === filter);
      }
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let one = all.find((each) => each._id === id);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async paginate({ filter = {}, opts = {} }) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);

      if (filter.category) {
        products = products.filter((product) =>
          product.category.includes(filter.category)
        );
      }

      const page = opts.page || 1;
      const limit = opts.limit || 10;
      const skip = (page - 1) * limit;
      const paginatedProducts = products.slice(skip, skip + limit);
      const totalDocs = products.length;

      if (totalDocs === 0) {
        const error = new Error("There aren't any documents");
        error.statusCode = 404;
        throw error;
      }

      const all = {
        docs: paginatedProducts,
        totalDocs,
        limit,
        page,
        totalPages: Math.ceil(totalDocs / limit),
      };

      return all;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      let all = await this.read();
      let one = all.find((each) => each._id === id);
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
      let one = all.find((each) => each._id === id);
      if (one) {
        let filtered = all.filter((each) => each._id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        return one;
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
      photo:
        "https://images.hola.com/imagenes/cocina/noticiaslibros/20200525168692/curcuma-polvo-infusion-capsulas-mejor-opcion/0-976-647/curcuma-adobe-t.jpg?tx=w_1200",
      category: "suplementos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Maca en Polvo",
      photo:
        "https://http2.mlstatic.com/D_NQ_NP_605365-MLA75036396803_032024-O.webp",
      category: "suplementos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Tofu Orgánico",
      photo:
        "https://http2.mlstatic.com/D_NQ_NP_2X_934310-MLA71639100335_092023-F.webp",
      category: "proteinas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Batata Orgánica",
      photo:
        "https://www.picturethisai.com/image-handle/website_cmsname/image/1080/154214756469702658.jpeg?x-oss-process=image/format,webp",
      category: "verduras",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Nueces de Brasil",
      photo:
        "https://belleza-estetica.com.ar/wp-content/uploads/2024/02/propiedades_de_las_nueces_de_brasil_para_adelgazar_y_como_tomarlas_46332_orig.jpg",
      category: "frutos secos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Tempeh de Soja",
      photo:
        "https://www.conasi.eu/blog/wp-content/uploads/2015/09/Sliced_tempeh.jpg",
      category: "proteinas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Alcachofas en Conserva",
      photo:
        "https://gastroactivity.com/wp-content/uploads/2020/04/conserva-de-alcachofas-escaldadas.jpg",
      category: "verduras",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Germen de trigo",
      photo:
        "https://cdn0.ecologiaverde.com/es/posts/4/5/6/germen_de_trigo_propiedades_beneficios_y_contraindicaciones_2654_600.webp",
      category: "cereal",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Sopa de Tomate Casera",
      photo:
        "https://www.alqueria.com.co/sites/default/files/styles/1327_612/public/receta-de-sopa-de-tomate_3_0.jpg?h=2dfa7a18&itok=VFyI4FsH",
      category: "sopas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Espaguetis de Calabacín",
      photo:
        "https://imag.bonviveur.com/emplatado-y-presentacion-final-de-los-espaguetis-de-calabacin-crudos-con-tomates-cherry-y-queso-partisano.webp",
      category: "verduras",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Chips de Plátano Verde",
      photo:
        "https://cdn0.recetasgratis.net/es/posts/9/8/9/chips_de_platano_verde_con_guacamole_50989_600.webp",
      category: "snacks",
      price: 1500,
      stock: 10,
    });
    await productsManager.create({
      title: "Chips de Garbanzos",
      photo:
        "https://d36fw6y2wq3bat.cloudfront.net/recipes/snack-de-garbanzos-crujientes/900/snack-de-garbanzos-crujientes.jpg",
      category: "snacks",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Levadura Nutricional",
      photo:
        "https://static.tuasaude.com/media/article/ca/cc/levedura-nutricional_20864_l.jpg",
      category: "suplementos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Kale Orgánico",
      photo: "https://tienda.gomc.com.ar/wp-content/uploads/kale.jpg",
      category: "verduras",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Pistachos",
      photo: "https://i.blogs.es/2cd175/pistachos/1366_2000.jpeg",
      category: "frutos secos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Seitan Ahumado",
      photo:
        "https://happyvegannie.com/wp-content/uploads/2023/06/seitan-1.jpg",
      category: "proteinas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Sopa de Lentejas",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJWz-gDAwBusZBm6ujpv7rcV_tjKNa43rvFpUn8OtiQg&s",
      category: "sopas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Té Verde Matcha",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH5uWliNJww7zDNV-N2G0t13_XAE0BrUZAirOM2-qJ2A&s",
      category: "bebidas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Granola Casera",
      photo:
        "https://images.cookforyourlife.org/wp-content/uploads/2018/08/shutterstock_239599594-min.jpg",
      category: "cereales",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Aguacates Hass",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7MgpXwanqSArQHGPUmZndhWFu_3oAIYR8N3er2QKXXA&s",
      category: "frutas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Chucrut Casero",
      photo:
        "https://www.topgastronomico.es/wp-content/uploads/2021/11/Chucrut.jpg",
      category: "fermentados",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Almendras Crudas",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROke8Kb1kw-PHiWWr74H7rNfacciqMpSJtKw&s",
      category: "frutos secos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Hummus Casero",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpMdgXOYZGFOe4H7011x9NcYSmU8DPurkorlxjVYQHjg&s",
      category: "snacks",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Salsa de Tomate",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRdSkZ2spjph65I_giIwVou8G1-i2_31hokLRvrp88ww&s",
      category: "condimentos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Té de Jengibre",
      photo:
        "https://www.recetas-japonesas.com/base/stock/Recipe/15-image/15-image_web.jpg.webp",
      category: "bebidas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Chips de Kale",
      photo:
        "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/2/21/0/MN0405H_crispy-kale-chips_s4x3.jpg.rend.hgtvcom.1280.1280.suffix/1580140162715.jpeg",
      category: "snacks",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Quinoa Orgánica",
      photo:
        "https://cdn.shopify.com/s/files/1/0267/9200/1582/files/La-Cesteria-Mercado-Saludable-Quinoa-Organica3.jpg?v=1654811089",
      category: "cereales",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Crema de Almendras",
      photo:
        "https://www.conasi.eu/blog/wp-content/uploads/2020/08/crema-de-almendras-con-personal-blender-44-1.jpg",
      category: "frutos secos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Champiñones Portobello",
      photo:
        "https://4.bp.blogspot.com/-9ABTFp5qxE4/XIidpjklglI/AAAAAAAAasc/Zspw-qawV3ExHuTV5SPW4LWOq-LVmd6WQCLcBGAs/s640/2895032438_512ba982bc.jpg",
      category: "verduras",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Sopa de Calabaza",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUKUxI70r3ef8OqZyDfprK5viYzEoD-0cLM4_NcxIgQg&s",
      category: "sopas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Tortitas de Maíz",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFgfx5q6bWIMvnXi9RluPO-GnVtDOl2k6WO1_bQq8SRA&s",
      category: "snacks",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Aceite de Coco Virgen",
      photo:
        "https://www.almacenholistico.com/wp-content/uploads/2015/07/aceite_coco2.jpg",
      category: "condimentos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Té de Hibisco",
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2GzvcWeLcZoQfFsS127Yb-5gRpVHqf6SkRyjTmEsPtQ&s",
      category: "bebidas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Sopa de Verduras",
      photo:
        "https://www.comedera.com/wp-content/uploads/2013/05/sopa-de-verduras-1.jpg",
      category: "sopas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Mantequilla de Almendras",
      photo:
        "https://www.tuhogar.com/content/dam/cp-sites/home-care/tu-hogar/es_mx/recetas/comida-saludable/como-hacer-mantequilla-de-almendras/mantequilla-de-almendras-axion-.jpg",
      category: "frutos secos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Té de Menta",
      photo:
        "https://content.clara.es/medio/2023/07/31/te-menta-piperita_95ba1dca_230731125424_1280x886.jpg",
      category: "bebidas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Salsa de Soja Orgánica",
      photo:
        "https://acdn.mitiendanube.com/stores/001/129/542/products/soja-yamasa-21-c182da47fded8278e317042451379886-1024-1024.jpg",
      category: "condimentos",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Harina de Almendras",
      photo:
        "https://neufood.com.ar/wp-content/uploads/2022/05/harina-de-almendras1-4d993e44b85fbeb45c15887161412979-640-0.jpg",
      category: "harinas",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Galletas de Avena y Pasas",
      photo:
        "https://galletasavena.com/wp-content/uploads/2018/08/6.-galletas-de-avena-y-pasas.jpg",
      category: "snacks",
      price: 1500,
      stock: 10,
    });

    await productsManager.create({
      title: "Vinagre de Manzana Orgánico",
      photo:
        "https://cdn0.ecologiaverde.com/es/posts/2/7/1/como_hacer_vinagre_de_manzana_organico_en_casa_1172_600.webp",
      category: "condimentos",
      price: 1500,
      stock: 10,
    });
  } catch (error) {
    console.log(error);
  }
}

//test();
