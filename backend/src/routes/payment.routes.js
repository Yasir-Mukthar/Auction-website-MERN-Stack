import { Router } from "express";
import { verifyAdmin, verifyUser,verifySeller } from "../middlewares/auth.middleware.js";
import { addPaymentMethodToCustomer } from "../controllers/payment.controller.js";


const router = Router();


router.route("/add-payment-method").post(verifyUser, addPaymentMethodToCustomer );




export default router;
