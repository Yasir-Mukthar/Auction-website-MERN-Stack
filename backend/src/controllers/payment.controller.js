import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import PaymentMethod from "../models/userPaymentMethod.model.js";
import Stripe from 'stripe';
const stripe= new Stripe(process.env.STRIPE_KEY);



// @desc Add payment method
// @route POST /api/v1/payments/add-payment-method
// @access Private



const addPaymentMethodToCustomer = asyncHandler(async (req, res) => {
    try {
        const { paymentMethodId } = req.body;
    console.log(paymentMethodId,"paymentMethodId,,,,,,,");
        if (!paymentMethodId) {
          return res
            .status(400)
            .json(new ApiResponse(400, "payment Method is required"));
        }
        const getUserId = req.user._id.toString();
        console.log(getUserId,"userId,,,,,,,,");
       
        const stripeCustomer = await PaymentMethod.findOne({ userId: getUserId });
        console.log(stripeCustomer,"stripeCustomer,,,,,,,,");

        if (!stripeCustomer) {
          return res.status(404).json(new ApiResponse(404, "Customer not found"));
        }
        console.log(stripeCustomer,"stripeCustomer,,,,,,,,");
    
        const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
          customer: stripeCustomer?.stripeCustomerId,
        });
        if(!paymentMethod){
          return res.status(404).json(new ApiResponse(404, "Payment method not added."));
        }

        if(paymentMethod){
            stripeCustomer.paymentMethodId=paymentMethodId;
            await stripeCustomer.save();
        }

        return res.status(200).json(new ApiResponse(200, "Payment method added successfully"));
        
    
        
      } catch (error) {
        console.log(error);
        
        return res.status(500).json(new ApiResponse(500, error?.message || "Internal server error"));
      }
});

export { 
    addPaymentMethodToCustomer,
 };
