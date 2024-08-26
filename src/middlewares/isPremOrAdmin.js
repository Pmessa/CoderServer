import { verifyToken } from "../utils/token.util.js"
import productsRepository from "../repositories/products.rep.js";

async function isPremOrAdmin(req, res, next) {
  try {
    let token = req.cookies["token"];
    token = verifyToken(token);
    const { _id, role } = token;
    const { pid } = req.params;
    const one = await productsRepository.readOneRepository(pid);
    console.log(role)
    if (role==1){
        return next()
    }
    if (one.supplier_id._id == _id && role == 2) {
      return next();
    } else {
      
      throw new Error("You do not own this product.");
    }
  } catch (error) {
    next(error);
  }
}

export default isPremOrAdmin