import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Auction from "../models/auction.model.js";
import mongoose from "mongoose";

// name: { type: String, required: true },
//   description: { type: String },
//   category: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory", required: true},
//   seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   startTime: { type: Date, required: true },
//   endTime: { type: Date, required: true },
//   bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],
//   winner: { type: mongoose.Schema.Types.ObjectId, ref: "Bid" },
//   status: {
//     type: String,
//     enum: ["upcoming", "active", "over"],
//     default: "upcoming",
//   },
//   location: {type:String },
//   image:{type:String,required:true},
//   startingPrice: { type: Number, required: true },
//   reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
//   additionalDetails: { type: String },

// @desc Create auction product
// @route POST /api/v1/auctions
// @access Private/ Seller only
const createAuction = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      startTime,
      endTime,
      startingPrice,
      location,
    } = req.body;
    const image = req.file?.path;

    console.log(name, "name");
    console.log(description, "description");
    console.log(category, "category");
    console.log(startTime, "startTime");
    console.log(endTime, "endTime");
    console.log(startingPrice, "startingPrice");
    // Check if fields are empty
    if (
      !name ||
      !description ||
      !category ||
      !startTime ||
      !endTime ||
      !startingPrice ||
      !location ||
      !image
    ) {
      return res
        .status(400)
        .json(new ApiResponse(400, "All fields are required"));
    }

    // Check if startTime is before endTime
    if (startTime >= endTime) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Start time must be before end time"));
    }

    // Check if startingPrice is a positive number
    if (startingPrice <= 0) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Starting price must be a positive number"));
    }

    const imgUrlCloudinary = await uploadOnCloudinary(image);

    if (!imgUrlCloudinary) {
      return res
        .status(500)
        .json(new ApiResponse(500, "Error uploading image"));
    }

    const auction = await Auction.create({
      name,
      description,
      category,
      seller: req.user._id,
      startTime,
      endTime,
      location,
      image: imgUrlCloudinary.url,
      startingPrice,
    });

    if (!auction) {
      return res
        .status(500)
        .json(new ApiResponse(500, "Error creating auction"));
    }

    return res
      .status(201)
      .json(new ApiResponse(201, "Auction created successfully", auction));
  } catch (error) {
    // Handle the error
    return res
      .status(500)
      .json(new ApiResponse(500, error?.message || "Internal server error"));
  }
});

// @desc Get all auctions
// @route GET /api/v1/auctions
// @access Public

const getAllAuctions = asyncHandler(async (req, res) => {
  try {
    
    const { location, category, itemName } = req.body;
    console.log(req.body, "req.body");
    let filter = {};
    if (location) filter.location = location;
    if (category) filter.category = category;
    if (itemName) {
      filter.name = { $regex: itemName, $options: "i" };
    }
    console.log(filter, "filter ......");
    const auctions = await Auction.find(filter).populate(
      "seller",
      "fullName email phone location profilePicture"
    );

    if (!auctions) {
      return res.status(404).json(new ApiResponse(404, "No auctions found"));
    }
    return res.json(
      new ApiResponse(200, "Auctions retrieved successfully", auctions)
    );
  } catch (error) {
    // Handle the error
    return res
      .status(500)
      .json(new ApiResponse(500, error?.message || "Internal server error"));
  }
});



// @desc Get a single Auction by ID
// @route GET /api/v1/auctions/:id
// @access Public

const getSingleAuctionById = asyncHandler(async (req, res) => {
  try {
    console.log("single auction getting...");

    const auction = await Auction.findById(req.params.id)
      .populate("category", "name")
      .populate("location", "name")
      .populate("seller", "fullName email phone location profilePicture")
      .populate("bids")
      .populate("winner", "amount")
      .populate("bids", "bidder bidAmount bidTime")
      .populate({
        path: "bids",
        populate: {
          path: "bidder",
          select: "fullName email profilePicture",
        },
      });

    if (!auction) {
      return res.status(404).json(new ApiResponse(404, "Auction not found"));
    }

    return res.json(
      new ApiResponse(200, "Auction retrieved successfully", auction)
    );
  } catch (error) {
    // Handle the error
    return res
      .status(500)
      .json(new ApiResponse(500, error?.message || "Internal server error"));
  }
});

// @desc Update auction status
// @route POST /api/v1/auctions/:id/status
// @access public

const updateAuctionStatus=asyncHandler(async(req,res)=>{
  try {
    const auction=await Auction.findById(req.params.id);
    if(!auction){
      return res.status(404).json(new ApiResponse(404,"Auction not found"));
    }
    auction.status=req.body.status;
    await auction.save();
    return res.json(new ApiResponse(200,"Auction status updated successfully",auction));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500,error?.message||"Internal server error"));
  }
});

export { 
  createAuction, 
  getAllAuctions, 
  getSingleAuctionById,
  updateAuctionStatus
};
