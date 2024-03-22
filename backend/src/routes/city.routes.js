import { Router } from "express";
import { verifyAdmin, verifyUser,verifySeller } from "../middlewares/auth.middleware.js";
import { addCity, getAllCities } from "../controllers/city.controller.js";



const router = Router();

// router.route("/register").post(registerUser);



router.route("/").post(verifyUser,verifyAdmin, addCity );
router.route("/").get( getAllCities);







export default router;
