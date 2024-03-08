import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ProductCategory from "../models/productCategory.model.js";


// name: { type: String, required: true, unique: true },
//   description: { type: String },
//   imageUrl: { type: String }, 


// @desc Create product category
// @route POST /api/v1/product-categories
// @access Private

const createProductCategory = asyncHandler(async (req, res) => {
    try {
        const { name, description } = req.body;
        const image = req.file?.path;
        
        // Check if fields are empty
        if (!name || !description || !image) {
            throw new ApiError(400, "All fields are required");
        };  

        // Check if product category exists
        const existedProductCategory = await ProductCategory.findOne({ name });
        if (existedProductCategory) {
            throw new ApiError(409, "Product category already exists");
        }

        
        const imgUrlCloudinary = await uploadOnCloudinary(image);
        
        if(!imgUrlCloudinary){
            throw new ApiError(500, "Error uploading image");
        }

        const productCategory = await ProductCategory.create({
            name,
            description,
            imageUrl: imgUrlCloudinary.url 
        });


        if (!productCategory) {
            throw new ApiError(500, "Error creating product category");
        }

        res.status(201).json(new ApiResponse(201, "Product category created successfully", productCategory));
    } catch (error) {
        // Handle the error
        throw new ApiError(500, error?.message || "Internal server error");
    }
});


// @desc Get a specific product category by id
// @route GET /api/v1/product-categories/:id
// @access Public

const getProductCategory = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const productCategory = await ProductCategory.findById(id);

        if (!productCategory) {
            throw new ApiError(404, "Product category not found");
        }
        res.status(200).json(new ApiResponse(200, "Product category retrieved successfully", productCategory));

    } catch (err) {
        throw new ApiError(500, err?.message || "Internal server error");
    }
});


// @desc Get all product categories
// @route GET /api/v1/product-categories
// @access Public

const getAllProductCategories = async ( req, res) => {
    try {
        const productCategories = await ProductCategory.find();
        res.status(200).json(new ApiResponse(200, "Product categories retrieved successfully", productCategories));
    } catch (err) {
        throw new ApiError(500, err?.message || "Internal server error");
    }
};


//@desc update product category
//@route PUT /api/v1/product-categories/:id
//@access Private/Admin

const updateProductCategory = asyncHandler(async (req, res) => {

try {
    const { id } = req.params;
    const { name, description } = req.body;
    const image = req.file?.path;
    const productCategory = await ProductCategory.findById(id);

    if (!productCategory) {
        throw new ApiError(404, "Product category not found");
    }
    //Checking for existing image and   updating the image
    if(image){
        const imgUrlCloudinary = await uploadOnCloudinary(image);
        if(!imgUrlCloudinary){
            throw new ApiError(500, "Error uploading image");
        }
        productCategory.imageUrl = imgUrlCloudinary.url;
    } 
    else{
        productCategory.imageUrl = productCategory.imageUrl;
    }
    
    productCategory.name = name ? name : productCategory.name;
    productCategory.description = description ? description : productCategory.description;

    await productCategory.save();

    res.status(201).json(new ApiResponse(201, "Product category updated successfully", productCategory));
    

    
} catch (error) {
    throw new ApiError(500, error?.message || "Internal server error");
    
    }});



    



export { 
    createProductCategory
    , getAllProductCategories
    , getProductCategory
    , updateProductCategory
 };
