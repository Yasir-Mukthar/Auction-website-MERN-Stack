import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import  User  from "../models/user.model.js";


export const verifyUser = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.JwtToken ||  req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Unauthorized request");
  }
});

export const verifySeller = asyncHandler(async (req, res, next) => {
  try {
    const user = req.user;

    if (user.userType !== "seller") {
      throw new ApiError(403, "Access denied");
    }

    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Unauthorized request");
  }
});

export const verifyAdmin = asyncHandler(async (req, res, next) => {
  try {
    const user = req.user;

    if (user.userType !== "admin") {
      throw new ApiError(403, "Access denied");
    }

    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Unauthorized request");
  }
});