import CustomRouter from "../CustomRouter.js";
import { createPayment } from "../../controllers/payment.controller.js";

class PaymentRouter extends CustomRouter {
    init() {
        this.create("/", ["USER, ADMIN"],createPayment )
    }


}

const paymentRouter = new PaymentRouter();

export default paymentRouter.getRouter();