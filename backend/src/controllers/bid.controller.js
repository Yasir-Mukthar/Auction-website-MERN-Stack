import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import Bid from "../models/bid.model.js";
import Auction from "../models/auction.model.js";



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
console.log(item,"item....");
        // Checking if user already placed a bid on this item
        // for (let i = 0; i < item.bids.length; i++) {
        //     if (item.bids[i].user == req.user._id) {
        //         return new ApiResponse(400, "You already placed a bid on this item");
        //     }
        // }

        //save to auction model in bids with bid and time

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

        return res.status(201).json(new ApiResponse(201, "Bid placed successfully", item));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
    }
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













export {
 addBidOnItem
}