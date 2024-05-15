import { Router } from "express";
import { verifyAdmin, verifyUser,verifySeller } from "../middlewares/auth.middleware.js";
import { addPaymentMethodToCustomer,updatePaymentMethod , paymentCheckout} from "../controllers/payment.controller.js";


const router = Router();

router.route("/checkout").post(verifyUser, paymentCheckout)
router.route("/update-payment-method").post(verifyUser, updatePaymentMethod);
router.route("/add-payment-method").post(verifyUser, addPaymentMethodToCustomer );




export default router;
