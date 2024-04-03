import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Auction from "../models/auction.model.js";
import mongoose from "mongoose";
import Bid from "../models/bid.model.js";

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
    const auctions = await Auction.find(filter)
      .populate("seller", "fullName email phone location profilePicture")
      .populate({
        path: "winner",

        populate: {
          path: "bidder",
          select: "fullName  profilePicture",
        },
      });

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
      }) //populate the winner's information as well bidamount and time

      .populate({
        path: "winner",

        populate: {
          path: "bidder",
          select: "fullName  profilePicture",
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

const updateAuctionStatus = asyncHandler(async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      return res.status(404).json(new ApiResponse(404, "Auction not found"));
    }
    //check start and now time and update status
    const now = new Date();

    if (now < auction.startTime) {
      auction.status = "upcoming";
    } else if (now > auction.startTime && now < auction.endTime) {
      auction.status = "active";
    } else {
      auction.status = "over";
    }

    await auction.save();
    return res.json(
      new ApiResponse(200, "Auction status updated successfully", auction)
    );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, error?.message || "Internal server error"));
  }
});

// @desc Get all auctions of a user on which he placed bids
// @route GET /api/v1/auctions/user-bids
// @access Private

const getBidsAuctionsByUser = asyncHandler(async (req, res) => {
  try {

    const bids = await Bid.find({ bidder: req.user._id }).populate("auction")
    // populate category in auction
    .populate({
      path: "auction",
      populate: {
        path: "category",
        select: "name",
      },
    })
    .sort({ createdAt: -1 });
    // it is not showing in reverse order
    

    if (!bids) {
      return res.status(404).json(new ApiResponse(404, "No bids found"));
    }

    

    return res.json(
      new ApiResponse(200, "bids retrieved successfully", bids)
    );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, error?.message || "Internal server error"));
  }
});


// @desc Get all auctions by a user uploaded by him
// @route GET /api/v1/auctions/user-auctions
// @access Private

const getAuctionsByUser = asyncHandler(async (req, res) => {
  try {
    const auctions = await Auction.find({ seller: req.user._id }).populate(
      "category",
      "name"
    );

    if (!auctions) {
      return res.status(404).json(new ApiResponse(404, "No auctions found"));
    }

    return res.json(
      new ApiResponse(200, "Auctions retrieved successfully", {
        auctions:auctions
      })
    );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, error?.message || "Internal server error"));
  }
});





// @desc delete auction by id
// @route DELETE /api/v1/auctions/delete/:id
// @access Private

const deleteSingleAuctionById = asyncHandler(async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      return res.status(404).json(new ApiResponse(404, "Auction not found"));
    }
    //delete all related data to this auction like bids and reviews

    const bids = await Bid.find({ auction: req.params.id });
    if (bids) {
      await Bid.deleteMany({ auction: req.params.id });
    }
console.log(auction, "auction.............");

await Auction.deleteOne({ _id: req.params.id });
return res.json(
      new ApiResponse(200, "Auction deleted successfully", auction)
    );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, error?.message || "Internal server error"));
  }
});



// @desc update a single auction by id
// @route PUT /api/v1/auctions/update/:id
// @access Private

const updateSingleAuactionById = asyncHandler(async (req, res) => {
 

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

    console.log(req.body, "req.body........");
const auction = await Auction.findById(req.params.id);
if (!auction) {
  return res.status(404).json(new ApiResponse(404, "Auction not found"));
}
//check start and now time and update status accordingly
let currentDate=new Date();

 if(startTime !== auction.startTime || endTime !== auction.endTime){
  if(currentDate.getTime()>auction.startTime.getTime()){
    return res.status(400).json(new ApiResponse(400, "Auction has already started, you can't update start time or end time"));
 }
 }

if(startTime > endTime){
  return res.status(400).json(new ApiResponse(400, "Start time must be before end time"));
}
if(startTime < currentDate.getTime()){
  auction.status = "active";
}else{
  auction.status = "upcoming";
}
if(auction.status === "over"){
  return res.status(400).json(new ApiResponse(400, "Auction is over, you can't update"));
}

    if(image){
    var imgUrlCloudinary = await uploadOnCloudinary(image);
    console.log(imgUrlCloudinary);
    if (!imgUrlCloudinary?.url) {
      return res.status(400).json(new ApiResponse(400, "Invalid image"));
    }
  }

    auction.name = name ? name : auction.name;
    auction.description = description ? description : auction.description;
    auction.category = category ? category : auction.category;
    auction.startTime = startTime ? startTime : auction.startTime;
    auction.endTime = endTime ? endTime : auction.endTime;
    auction.startingPrice = startingPrice ? startingPrice : auction.startingPrice;
    auction.location = location ? location : auction.location;

    auction.image = imgUrlCloudinary?.url
      ? imgUrlCloudinary.url
      : auction.image ;
    


    await auction.save();
    return res.status(201).json(new ApiResponse(201, "Auction Updated Successfully."))

  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          error.message || "Internal Server Error"
        )
      );
  }
});



export {
  createAuction,
  getAllAuctions,
  getSingleAuctionById,
  updateAuctionStatus,
  getBidsAuctionsByUser,
  getAuctionsByUser,
  deleteSingleAuctionById,
  updateSingleAuactionById,
};
