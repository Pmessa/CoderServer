import  "../utils/env.util.js";
import { faker } from "@faker-js/faker";
import dbConnect from "../utils/dbConnect.util.js";
import productsRepository from "../repositories/products.rep.js";

async function createData() {
  try {
    dbConnect();
    for (let i = 0; i < 1000; i++) {
      const product = {
        title: faker.commerce.product(),
        photo: faker.image.avatar(),
        category: "Without category",
        stock: Math.floor(Math.random() * 101),
        price: Math.floor(Math.random() * 100001),
      };
      await productsRepository.createRepository(product);
    }
    console.log("PRODUCT CREATED");
  } catch (error) {
    console.log(error);
  }
}
createData();
