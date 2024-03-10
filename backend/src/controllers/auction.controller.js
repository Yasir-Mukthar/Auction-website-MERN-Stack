import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Auction from "../models/auction.model.js";



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
        const { name, description, category, startTime, endTime, startingPrice, location } = req.body;
        const image = req.file?.path;


        
        // Check if fields are empty
        if (!name || !description || !category || !startTime || !endTime || !startingPrice || !location  || !image) {
            return res.status(400).json(new ApiResponse(400, "All fields are required"));
        };  
        
        // Check if startTime is before endTime
        if (startTime >= endTime) {
            return res.status(400).json(new ApiResponse(400, "Start time must be before end time"));
        }
        
        // Check if startingPrice is a positive number
        if (startingPrice <= 0) {
            return res.status(400).json(new ApiResponse(400, "Starting price must be a positive number"));
        }
        
        const imgUrlCloudinary = await uploadOnCloudinary(image);
        
        if(!imgUrlCloudinary){
            return res.status(500).json(new ApiResponse(500, "Error uploading image"));
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
            startingPrice
            
        });

        if(!auction){
            return res.status(500).json(new ApiResponse(500, "Error creating auction"));
        }

        return res.status(201).json(new ApiResponse(201, "Auction created successfully", auction));
    } catch (error) {
        // Handle the error
        return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
    }
});


// @desc Get all auctions
// @route GET /api/v1/auctions
// @access Public

const getAllAuctions = asyncHandler(async (req, res) => {
    try {
        // const auctions = await Auction.find().populate("category", "name").populate("seller", "fullName email phone location").populate("bids", "amount").populate("winner", "amount").populate("reviews", "comment rating")

        const auctions = await Auction.find()

        if (!auctions) {
            return res.status(404).json(new ApiResponse(404, "No auctions found"));
        }
        return res.json(new ApiResponse(200, "Auctions retrieved successfully", auctions));
    } catch (error) {
        // Handle the error
        return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
    }
});















export { 
    createAuction 
    ,getAllAuctions
};