import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import PaymentMethod from "../models/userPaymentMethod.model.js";
import Stripe from 'stripe';
import mongoose from "mongoose";
// const stripe= new Stripe(process.env.STRIPE_KEY);
const stripe = new Stripe("sk_test_51P5t81Lvvxf0OOpIgdu78eLqln3YJO5Q7NfKMfNEl93qXkiLjy6FBzvY37O8p1QlhWOWwQUg6m9zU5WtDaYfKMLS00rhq7lcCT")


// @desc Register user
// @route POST /api/v1/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  
  const { fullName, email, password } = req.body;
  if (fullName == "") {
    return res.status(400).json(new ApiResponse(400, "Full name is required"));
  }

  if ([fullName, email, password].some((fields) => fields?.trim() === "")) {
    return res
      .status(400)
      .json(new ApiResponse(400, "All fields are required"));
  }
  const existedUser = await User.findOne({
    $or: [{ fullName }, { email }],
  });

  if (existedUser) {
    return res.status(409).json(new ApiResponse(409, "User already exists"));
  }

  const customer=await stripe.customers.create({
    email:email,
    name:fullName
});


if(!customer){
  return res.status(500).json(new ApiResponse(500, "Error creating user. Please try again"));
}

  const user = await User.create({
    fullName: fullName.toLowerCase(),
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    return res.status(500).json(new ApiResponse(500, "Error creating user"));
  }

  //create payment method
  const paymentMethod = await PaymentMethod.create({
    stripeCustomerId: customer.id,
    userId: createdUser._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "User Registered successfully", createdUser));
});



// @desc Login user
// @route POST /api/v1/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;
  if (!password && !email) {
    res
      .status(400)
      .json(new ApiResponse(400, "Email and password are required"));
    return;
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json(new ApiResponse(404, "User not found"));
    return;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json(new ApiResponse(401, "Invalid password"));
    return;
  }
  const JwtToken = user.generateJwtToken();

  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
    //httpOnly: true,
    secure: true,
    maxAge: 1 * 24 * 60 * 60 * 1000
  };

  return res
    .status(200)
    .cookie("JwtToken", JwtToken, options)
    .json(
      new ApiResponse(200, "User logged in successfully", {
        user: loggedInUser,
        JwtToken,
      })
    );
});

// @desc Forgot password
// @route POST /api/v1/users/forgot-password
// @access Public
const forgetPasswordSendEmail = asyncHandler(async (req, res) => {

  const { email } = req.body;
  if (!email) {
    res.status(400).json(new ApiResponse(400, "Email is required"));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json(new ApiResponse(404, "Enter correct mail."));
  }
  const resetToken = user.generateResetToken();
  await user.save({ validateBeforeSave: false });
  //send email
  const resetUrl = `http://localhost:5173/reset-password/${user._id}/${resetToken}`;
  //send email using nodemailer or any other mailing service
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: user.email,
      subject: "Password Reset",
      text: `Dear ${user.fullName},\n\nPlease click on the following link ${resetUrl} to reset your password.\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.status(200).json(
          new ApiResponse(200, "Reset token sent to your email", {
            resetToken,
          })
        );
      }
    });
  } catch (err) {
    return res.status(500).json(new ApiResponse(500, "Error sending email"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Reset password link sent to your email"));
});

// @desc Reset password
// @route POST /api/v1/users/reset-password/:id/:token
// @access Public

const resetPassword = asyncHandler(async (req, res) => {
  //get user id and reset token
  //check if user exists
  //check if token is valid
  //update user password
  //return response
  const { id, token } = req.params;
  const { password } = req.body;
  if (!id || !token || !password) {
    return res.status(400).json(new ApiResponse(400, "Invalid request"));
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json(new ApiResponse(404, "User not found"));
  }
  if (!user.resetToken) {
    return res.status(400).json(new ApiResponse(400, "Invalid reset link"));
  }

  if (user.resetToken !== token) {
    return res.status(400).json(new ApiResponse(400, "Invalid reset link"));
  }
  if (user.resetTokenExpire < Date.now()) {
    return res.status(400).json(new ApiResponse(400, "Reset link expired"));
  }

  try {
    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();
    return res
      .status(200)
      .json(new ApiResponse(200, "Password reset successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, "Error resetting password"));
  }
});

// @desc Logout user
// @route POST /api/v1/users/logout
// @access Private

const logoutUser = asyncHandler(async (req, res) => {
  //clear cookies
  //return response
  res.clearCookie("JwtToken");
  res.status(200).json(new ApiResponse(200, "User logged out successfully"));
});

// @desc update user profile
// @route POST /api/v1/users/update-user-profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  //get user id from token
  //get user details from frontend
  //update user profile
  //return respons

  try {
    const { fullName, email, location, userType, phone, address, city ,gender, description} =
      req.body;
    const profilePath = req.file?.path;
    const userId = req.user?._id;
    console.log(req.body, "req.body");
    console.log(profilePath, "req.file")

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json(new ApiResponse(400, "User not found"));
    }
    if(profilePath){
    var imgUrlCloudinary = await uploadOnCloudinary(profilePath);
    //console.log(imgUrlCloudinary);
    if (!imgUrlCloudinary?.url) {
      return res.status(400).json(new ApiResponse(400, "Invalid image"));
    }
  }

    user.fullName = fullName ? fullName : user.fullName;
    user.email = email ? email : user.email;
    user.location = location ? location : user.location;
    user.userType = userType ? userType : user.userType;
    user.profilePicture = imgUrlCloudinary?.url
      ? imgUrlCloudinary.url
      : user.profilePicture || "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg";
    user.phone = phone ? phone : user.phone;
    user.address = address ? address : user.address;
    user.city = city ? city : user.city;
    user.gender=  gender ? gender: user.gender ;
    user.description= description? description: user.description;


    await user.save();

    res.json(new ApiResponse(200, "User profile updated successfully",{user:user}));
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

// @desc change current password
// @route POST /api/v1/users/change-password
// @access Private

const changeCurrentPassword = asyncHandler(async (req, res) => {
  try {
    //get user id from token
    const userId = req.user._id;
    //get old password and new password from frontend
    const { oldPassword, newPassword } = req.body;
   // console.log(oldPassword, newPassword, "old and new password")
    //validate old password and new password
    if (!oldPassword || !newPassword) {
      return res.status(400).json(new ApiResponse(400, "All fields are required"));
    }

    //check if the old password is correct
    const user = await User.findById(userId);

    if (!user || !(await user.comparePassword(oldPassword))) {
      return res.status(401).json(new ApiResponse(401, "Invalid old password"));
    }

    //if everything is ok then update the password
    user.password = newPassword;
    await user.save();

    //return response
    res.json(new ApiResponse(200, "Password changed successfully"));
  } catch (error) {
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

// @desc get current user
// @route GET /api/v1/users/current-user
// @access Private
const getCurrentUser = asyncHandler(async (req, res) => {
  try {
    console.log("getting current user.....");
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json(new ApiResponse(200, "User fetched", { user:user}));
  } catch (error) {
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

// @desc get all users
// @route GET /api/v1/users
// @access Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(new ApiResponse(200, "Users fetched successfully", users));
  } catch (error) {
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


// @desc get current user
// @route GET /api/v1/users/:userid
// @access Admin
const getUserById = asyncHandler(async (req, res) => {
  try {
    console.log("getting user by id.....");
    const user = await User.findById(req.params.userid).select("-password");
    return res.status(200).json(new ApiResponse(200, "User fetched", { user:user}));
  } catch (error) {
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


// @desc update user profile by id
// @route POST /api/v1/users/update-user/:id
// @access Admin

const updateUserById = asyncHandler(async (req, res) => {
  try {
    console.log("updated profle in admin filed");
    const { fullName, email, location, userType, phone, address, city ,gender, description} =
      req.body;
      console.log(fullName, " fullname, ");
      console.log(email, " email, ");
      console.log(location, " location, ");
      console.log(userType, " userType, ");
    const profilePath = req.file?.path;
    
    const userId = req?.params?.id;
    console.log(userId," KDJFKJ");
    //check user id is correct format which is for models not any other like string 
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json(new ApiResponse(400, "Invalid user id"));
    }
    

   
    console.log(req.body, "req.body");
    console.log(profilePath, "req.file")

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json(new ApiResponse(400, "User not found"));
    }
    if(profilePath){
    var imgUrlCloudinary = await uploadOnCloudinary(profilePath);
    //console.log(imgUrlCloudinary);
    if (!imgUrlCloudinary?.url) {
      return res.status(400).json(new ApiResponse(400, "Invalid image"));
    }
  }

    user.fullName = fullName ? fullName : user.fullName;
    user.email = email ? email : user.email;
    user.location = location ? location : user.location;
    user.userType = userType ? userType : user.userType;
    user.profilePicture = imgUrlCloudinary?.url
      ? imgUrlCloudinary.url
      : user.profilePicture || "https://res.cloudinary.com/dnsxaor2k/image/upload/v1709735601/vsauyvodor9ykjca5zvj.jpg";
    user.phone = phone ? phone : user.phone;
    user.address = address ? address : user.address;
    user.city = city ? city : user.city;
    user.gender=  gender ? gender: user.gender ;
    user.description= description? description: user.description;


    await user.save();

    res.json(new ApiResponse(200, "User profile updated successfully",{user:user}));
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


// @desc delete a user by id
// @route DELETE /api/v1/users/:id
// @access Admin

const deleteUserById = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId, "dlete a user");
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json(new ApiResponse(400, "Invalid user id"));
    }
    
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json(new ApiResponse(404, "User not found"));
    }
    return res.json(new ApiResponse(200, "User deleted successfully"));

  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          error.message || "Internal Server Error"
        )
      );
  }
})


// @desc TOP 5 SELLERS WHO UPLOADED MORE ITEMS AND SOLD(STATUS IS PAID)
// @route GET /api/v1/users/top-sellers
// @access Admin

const getTopSellers = asyncHandler(async (req, res) => {
  try {
    
    
    const topSellers = await User.aggregate([
      {
        $lookup: {
          from: "auctions",
          localField: "_id",
          foreignField: "seller",
          as: "auctions",
        },
      },
      {
        $match: {
          "auctions.paid": true,
        },
      },
      {
        $project: {
          fullName: 1,
          email: 1,
          profilePicture: 1,
          totalAuctions: { $size: "$auctions" },
          paidAuctions: {
            $size: {
              $filter: {
                input: "$auctions",
                as: "auction",
                cond: { $eq: ["$$auction.paid", true] },
              },
            },
          },

        },
      },
        
      {
        $sort: { totalAuctions: -1 },
      },
      {
        $limit: 5,
      },
    ]);
         
    
    res.json(new ApiResponse(200, "Top sellers fetched successfully", topSellers));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          error.message || "Internal Server Error"
        )
      );
  }
})


// @desc TOP FIVE CITIES WHICH HAVE MOST USERS
// @route GET /api/v1/users/top-cities
// @access Admin

const getTopCities= asyncHandler(async(req, res)=>{
  try{
    const topCities= await User.aggregate([
      {
        $group:{
          _id:"$city",
          totalUsers:{$sum:1}
        }
      },
      {
        $sort:{totalUsers:-1}
      },
      {
        $limit:6
      }
    ])
    //remove first item
    topCities.splice(0,1)
    res.json(new ApiResponse(200, "Top cities fetched successfully", topCities));
  }catch(error){
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiResponse(
          error.statusCode || 500,
          error.message || "Internal Server Error"
        )
      );
  }
})


export {
  registerUser,
  loginUser,
  forgetPasswordSendEmail,
  resetPassword,
  logoutUser,
  updateUserProfile,
  changeCurrentPassword,
  getCurrentUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getTopSellers,
  getTopCities,
};
