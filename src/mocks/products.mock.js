import  "../utils/env.util.js";
import { faker } from "@faker-js/faker";
import dbConnect from "../utils/dbConnect.util.js";
import productsRepository from "../repositories/products.rep.js";

async function createData() {
  try {
    dbConnect();
    for(let i = 1; i<=2; i++){
      const product = {
        title: faker.commerce.productName(),
        photo: faker.image.avatarLegacy(),
        category: "Without category",
        stock: 5,
        price: 3350,
      };
      await productsRepository.createRepository(product);
    }
    console.log("PRODUCT CREATED");
  } catch (error) {
    console.log(error);
  }
}
createData();
