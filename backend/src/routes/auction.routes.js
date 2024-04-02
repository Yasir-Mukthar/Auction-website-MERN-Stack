import { Router } from "express";
import { createAuction,
        getAllAuctions, 
        getSingleAuctionById,
        updateAuctionStatus,
        getBidsAuctionsByUser
    } from "../controllers/auction.controller.js";
import { verifyAdmin, verifyUser,verifySeller } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";




const router = Router();

// router.route("/register").post(registerUser);


router.route("/").post( getAllAuctions);
router.route("/:id/status").post(updateAuctionStatus);
router.route("/user-bids").get(verifyUser, getBidsAuctionsByUser);
router.route("/create-auction").post(verifyUser,verifySeller,  upload.single("image"), createAuction);

router.route("/:id").get(getSingleAuctionById);









export default router;
