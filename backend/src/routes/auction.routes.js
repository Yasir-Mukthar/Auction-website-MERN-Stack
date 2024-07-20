import { Router } from "express";
import { 
        createAuction,
        getAllAuctions, 
        getSingleAuctionById,
        updateAuctionStatus,
        getBidsAuctionsByUser,
        getAuctionsByUser,
        deleteSingleAuctionById,
        updateSingleAuactionById,
        getAuctionWinner,
        getLiveAuctions,
        getUpcomingAuctions,
        updatePaymentStatus
    } from "../controllers/auction.controller.js";
import { verifyAdmin, verifyUser,verifySeller } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";




const router = Router();

// router.route("/register").post(registerUser);

router.route("/upcoming-auctions").get(getUpcomingAuctions);
router.route("/live-auctions").get(getLiveAuctions);
router.route("/:id/winner").get(getAuctionWinner);
router.route("/").post( getAllAuctions);
router.route("/:id/status").post(updateAuctionStatus);
router.route("/update-payment-status/:id").put(updatePaymentStatus )
router.route("/user-bids").get(verifyUser, getBidsAuctionsByUser);
router.route("/delete/:id").delete(verifyUser, verifySeller, deleteSingleAuctionById);
router.route("/update/:id").put(verifyUser, verifySeller,upload.single("image") ,  updateSingleAuactionById)
router.route("/user-auctions").get(verifyUser,verifySeller, getAuctionsByUser);
router.route("/create-auction").post(verifyUser,verifySeller,  upload.single("image"), createAuction);
router.route("/:id").get(getSingleAuctionById);

router.route("/admin-delete/:id").delete(verifyUser, verifyAdmin, deleteSingleAuctionById);









export default router;
