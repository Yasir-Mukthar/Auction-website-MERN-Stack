import { Router } from "express";
import { verifyAdmin, verifyUser,verifySeller } from "../middlewares/auth.middleware.js";
import {getCartItems , deleteCartItem } from "../controllers/cart.controller.js";



const router = Router();




router.route("/").get(verifyUser, getCartItems);
router.route("/:id").delete(verifyUser, deleteCartItem)







export default router;
