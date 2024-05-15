import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import Cart from "../models/cart.model.js"
import { populate } from "dotenv";


// @desc get cart items
// @route GET /api/v1/cart
// @access Private

const getCartItems = asyncHandler(async (req, res)=>{
    try {
        const cartItems = await Cart.find({user:req.user._id})
        .populate({
            path: "products"
        
        })

        return res.status(200).json(new ApiResponse(200, "Cart items found", cartItems));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
    }
})


// @desc delete item from cart
// @route Delete /api/v1/cart
// @access Private

const deleteCartItem=asyncHandler(async(req, res)=>{
    try {
        //get id from endpoint
        const {id} = req.params
        console.log(id,"m,,,,,,,,,");
        const cart=await Cart.findOne({user:req.user._id});
        if(!cart){
            return res.status(404).json(new ApiResponse(404, "Cart not found"))
        }
        

        //remove product from cart
        cart.products = cart.products.filter(product=>product.toString() !== id)

        await cart.save();
        return res.status(200).json(new ApiResponse(200, "Product removed from cart successfully"))
        
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"))
        
    }

})





export {
    getCartItems,
    deleteCartItem,
}