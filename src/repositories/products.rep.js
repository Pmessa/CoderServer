import Repository from "./repository.js";
import dao from "../dao/dao.factory.js"
const {products}= dao;

const productsRepository = new Repository(products)
export default productsRepository