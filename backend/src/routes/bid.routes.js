import { Router } from "express";
import { verifyAdmin, verifyUser,verifySeller } from "../middlewares/auth.middleware.js";
// import { addCity, getAllCities } from "../controllers/city.controller.js";
import { addBidOnItem,getWinnerOfAuction, getBidsByUser,getAllBidsByAuctionId } from "../controllers/bid.controller.js";



const router = Router();

// router.route("/register").post(registerUser);

router.route("/get-all-bids/:auctionId").get( getAllBidsByAuctionId);
router.route("/:id/winner").get( getWinnerOfAuction);
router.route("/get-all-bids-items").get(verifyUser, getBidsByUser);
router.route("/:id").post(verifyUser, addBidOnItem );







export default router;
