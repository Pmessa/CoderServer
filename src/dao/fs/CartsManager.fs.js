import fs from "fs";
import crypto from "crypto";

class CartsManager {
  constructor() {
    this.path = "./src/dao/fs/files/carts.json";
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
    try {
      if (data.user_id && data.product_id) {
        const cart = {
          _id: data.id || crypto.randomBytes(12).toString("hex"),
          user_id: data.user_id,
          photo: data.photo,
          product_id: data.product_id,
          quantity: data.quantity || 1,
          state: data.state || "reserved",
        };

        let cartFile = await fs.promises.readFile(this.path, "utf-8");
        cartFile = JSON.parse(cartFile);
        cartFile.push(cart);
        cartFile = JSON.stringify(cartFile, null, 2);

        await fs.promises.writeFile(this.path, cartFile);
        return cart;
      } else {
        throw new Error("ENTER THE REQUIRED FIELDS");
      }
    } catch (err) {
      throw err;
    }
  }

  async read(filter) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      let all_products = await fs.promises.readFile("./src/dao/fs/files/products.json", "utf-8");
      all_products = JSON.parse(all_products)
      all = JSON.parse(all);
      if (filter) {
        all = all.filter((each) => each.user_id === filter.user_id);
        all.map((el) => {
          const product_content = all_products.filter((each) => each._id === el.product_id)
          el.product_id={
            _id: product_content[0]._id,
            title: product_content[0].title,
            price: product_content[0].price, 
            photo: product_content[0].photo
          }
        })
        console.log(all)
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
      let cart = all.find((each) => each._id === id);
      console.log("id: ",id)
      if (cart) {
        let filtered = all.filter((each) => each._id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        return cart;
      } else {
        const error = new Error("ID Not Found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }
  async destroyAll(uid) {
    try {
      const {user_id} = uid
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let cart = all.find((each) => each.user_id === user_id);
      if (cart) {
        let filtered = all.filter((each) => each.user_id !== user_id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        return cart;
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


const cartsManager = new CartsManager();

export default cartsManager;

/* async function test() {
  try {
    await cartsManager.create({
      id: "802b81e18fcefbf26073c387",
      user_id: "User_id",
      product_id: "Product_id",
      quantity: 1,
      state: "reserved",
    });
    await cartsManager.read();
    await cartsManager.readOne("702b81e18fcefbf26073c386");
    await cartsManager.destroy("702b81e18fcefbf26073c386");
    await cartsManager.read();
    console.log("Test exitoso.");
  } catch (error) {
    console.log(error);
  }
}

test(); */
