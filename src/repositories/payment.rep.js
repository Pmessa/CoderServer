//logica de stripe
import Stripe from "stripe";
import cartsManager from "../dao/mongo/managers/CartsManager.mongo.js";
import CheckoutProduct from "../dto/checkoutProduct.dto.js";
import environment from "../utils/env.util.js"

const stripe = new Stripe(process.env.STRIPE_KEY_SECRET);

const createPaymentRepository = async (user_id) => {
  try {
    let productsOnCart = await cartsManager.readCart( user_id );
    productsOnCart = productsOnCart.map(
      (product) => new CheckoutProduct(product)
    );
    //console.log(productsOnCart);
    const line_items = productsOnCart;
    const mode = "payment";
    const success_url = `${environment.HOST}${environment.HOST_PORT ? ":"+environment.HOST_PORT : ''}/thanks`;
    const intent = await stripe.checkout.sessions.create({
      line_items,
      mode,
      success_url,
    });
    return intent;
  } catch (error) {
    throw error;
  }
};

export { createPaymentRepository };