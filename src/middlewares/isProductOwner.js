import { verifyToken } from "../utils/token.util.js"
import productsRepository from "../repositories/products.rep.js";

async function isProductOwner(req, res, next) {
  try {
    let token = req.body.token;
    console.log(token)
    token = verifyToken(token);
    const { _id, role } = token;
    const { product_id } = req.body;
    const one = await productsRepository.readOneRepository(product_id);
    if (one.supplier_id._id != _id) {
      return next();
    } else {
      throw new Error("You do not own this product.");
    }
  } catch (error) {
    next(error);
  }
}

export default isProductOwner