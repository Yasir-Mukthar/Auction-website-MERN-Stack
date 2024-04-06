import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  bidder: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  auction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auction",
    required: true,
  },
  bidAmount: { type: Number, required: true },
  bidTime: { type: Date, default: Date.now },
  isWinningBid: { type: Boolean, default: false },
},
{
  timestamps: true,
});

const Bid = mongoose.model("Bid", bidSchema);

export default Bid;
