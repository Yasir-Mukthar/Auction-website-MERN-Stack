import { Router } from "express";
import { createAuction ,getAllAuctions} from "../controllers/auction.controller.js";
import { verifyAdmin, verifyUser,verifySeller } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";




const router = Router();

// router.route("/register").post(registerUser);



router.route("/").post(verifyUser,verifySeller,  upload.single("image"), createAuction);
router.route("/").get( getAllAuctions);







export default router;
