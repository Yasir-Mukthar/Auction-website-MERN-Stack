import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import Bid from "../models/bid.model.js";
import Auction from "../models/auction.model.js";
import User from "../models/user.model.js";







// @desc Add bid on item
// @route POST /api/v1/bids/:itemId
// @access Private

const addBidOnItem = asyncHandler(async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json(new ApiResponse(400, "Amount is required"));
    }
    console.log(amount, "amount");

    let item = await Auction.findById(req.params.id); // Find the item with that id in our database
    if (!item) {
      return res.status(404).json(new ApiResponse(404, "Item not found"));
    }
    console.log(item, "item....");

    //saving to bid model
    const newBid = new Bid({
      bidder: req.user._id,
      auction: req.params.id,
      bidAmount: req.body.amount,
    });

    await newBid.save();

    //bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],

    item.bids.push(newBid._id);
    item.startingPrice = amount;

    await item.save();

    return res
      .status(201)
      .json(new ApiResponse(201, "Bid placed successfully", item));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, error?.message || "Internal server error"));
  }
});

//@desc Get all a winner of an auction
//@route GET /api/auctions/:id/winner
//@access Public

const getWinnerOfAuction = asyncHandler(async (req, res) => {

    console.log(req.params.id, "req.params.id")
  const bids = await Bid.find({ auction: req.params.id});
console.log(bids,"auction.........");

  if (!bids) {
    return res.status(404).json(new ApiResponse(404, "Auction not found"));
  }
  if(bids.length === 0){
    return res.status(406).json(new ApiResponse(406, "No bids found"));
    }

  //we got auction array
    //we need to get the max bid from the array
    //then we need to get the user id of the max bid
    //then we need to get the user from the user id
    //then we need to set the winner of the auction to the user
    //then we need to set the auction to over
    //then we need to save the auction


    let maxBidId = bids[0]._id;
    let maxAmount = bids[0].bidAmount;
    for (let i = 1; i < bids.length; i++) {
      if (bids[i].bidAmount > maxAmount) {
        maxAmount = bids[i].bidAmount;
        maxBidId = bids[i]._id;
      }
    }

    console.log(maxAmount, "maxAmount");
    console.log(maxBidId, "maxBid");
    const auction = await Auction.findById(req.params.id);
    const winnerUser = await Bid.findById(maxBidId).populate("bidder","fullName email phone profilePicture");

    console.log(winnerUser, "winnerUser");

    auction.winner = maxBidId;
    auction.status = "over";

    await auction.save();

    return res.status(200).json(new ApiResponse(200, "Winner of the auction", winnerUser));
});
    
  


// bidder: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   auction: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Auction",
//     required: true,
//   },
//   bidAmount: { type: Number, required: true },
//   bidTime: { type: Date, default: Date.now },
//   isWinningBid: { type: Boolean, default: false },

export { addBidOnItem
, getWinnerOfAuction
 };
