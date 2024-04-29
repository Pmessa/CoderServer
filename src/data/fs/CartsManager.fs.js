import fs from "fs";
import crypto from "crypto";

class CartsManager {
  constructor() {
    this.path = "./src/data/fs/files/carts.json";
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

    try{
      const newcart = {
        user_id: data.id || crypto.randomBytes(12).toString("hex"),
        product_id: data.id || crypto.randomBytes(12).toString("hex"),
        quantity: data.id || 1,
        state: data.id || "reserved",
      };
   
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      const isDuplicate = all.find(
        (cart) => cart.id === newcart.id 
      );
      if (isDuplicate) {
        console.log("The product already exists in the cart.");
      }else {
        all.unshift(newcart);

        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        console.log("cart File System created:", newcart.title);
      }

      return newcart;
    } catch (error) {
      throw error;
    }}
  
  async read(cat) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      cat && (all = all.filter((each) => each.category === cat));
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
      let cart = all.find((each) => each.id === id);
      if (cart) {
        let filtered = all.filter((each) => each.id !== id);
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

async function test() {
  try {
    await cartsManager.create({
      user_id:"User_id",
      product_id:"Product_id",
      quantity:1,
      state:"reserved",
    });

  } catch (error) {
    console.log(error);
  }
}

test();
