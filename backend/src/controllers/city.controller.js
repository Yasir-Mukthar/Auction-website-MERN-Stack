import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import City from "../models/city.model.js";



// @desc Add city
// @route POST /api/v1/cities
// @access Private

const addCity = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;

        // Check if fields are empty
        if (!name) {
            return res.status(400).json(new ApiResponse(400, "All fields are required"));
        }

        // Check if city exists
        const existedCity = await City.findOne({ name });
        if (existedCity) {
            return res.status(409).json(new ApiResponse(409, "City already exists"));
        }

        const city = await City.create({
            name
        });

        if (!city) {
        return res.status(500).json(new ApiResponse(500, "Error creating city"));
        }

        return res.status(201).json(new ApiResponse(201, "City created successfully", city));
    } catch (error) {
        // Handle the error
        return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
    }
});


// @desc Get all cities
// @route GET /api/v1/cities
// @access Public

const getAllCities = asyncHandler(async (req, res) => {
    try {
        const cities = await City.find({});

        if (!cities) {
            return res.status(404).json(new ApiResponse(404, "Cities not found"));
        }

        return res.status(200).json(new ApiResponse(200, "Cities found", cities));
    } catch (error) {
        // Handle the error
        return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
    }
});







export {
    addCity,
    getAllCities
}