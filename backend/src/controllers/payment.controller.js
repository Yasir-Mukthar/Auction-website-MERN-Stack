import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import PaymentMethod from "../models/userPaymentMethod.model.js";
import Stripe from "stripe";
import User from "../models/user.model.js";
// const stripe = new Stripe(process.env.STRIPE_KEY);
// const stripe = new Stripe("sk_test_51Oktd0SFo6ikMNdBlRddtnGqOJL1WRx92gJ4BTlpcP07172oQ2F3jTE5F0HtWeCSu3z0MA1GQhiAhG1oysUQ3Nq600eUow95pq")

const stripe = new Stripe("sk_test_51P5t81Lvvxf0OOpIgdu78eLqln3YJO5Q7NfKMfNEl93qXkiLjy6FBzvY37O8p1QlhWOWwQUg6m9zU5WtDaYfKMLS00rhq7lcCT")


// recluze
// dsa 27
// op
// networking

//paper crdeit
//backend
//frontened
//stock semulator

// @desc Add payment method
// @route POST /api/v1/payments/add-payment-method
// @access Private

const addPaymentMethodToCustomer = asyncHandler(async (req, res) => {
  try {
    const { paymentMethodId } = req.body;
    console.log(paymentMethodId, "paymentMethodId,,,,,,,");
    if (!paymentMethodId) {
      return res
        .status(400)
        .json(new ApiResponse(400, "payment Method is required"));
    }
    const getUserId = req.user._id.toString();
    console.log(getUserId, "userId,,,,,,,,");

    const stripeCustomer = await PaymentMethod.findOne({ userId: getUserId });
    console.log(stripeCustomer, "stripeCustomer,,,,,,,,");

    if (!stripeCustomer) {
      return res.status(404).json(new ApiResponse(404, "Customer not found"));
    }
    console.log(stripeCustomer, "stripeCustomer,,,,,,,,");

    const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
      customer: stripeCustomer?.stripeCustomerId,
    });
    if (!paymentMethod) {
      
      return res
        .status(404)
        .json(new ApiResponse(404, "Payment method not added."));
    }

    if (paymentMethod) {
      stripeCustomer.paymentMethodId = paymentMethodId;
      await stripeCustomer.save();
    }

     //finde user and update verifiedPayment
     const user = await User.findById({ _id: getUserId });
     console.log(user, "user,,,,,,,,payment method");
     if (!user) {
       return res.status(404).json(new ApiResponse(404, "User not found"));
     }
     user.paymentVerified = true;
     await user.save();
    return res
      .status(200)
      .json(new ApiResponse(200, "Payment method added successfully"));
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json(new ApiResponse(500, error?.message || "Internal server error"));
  }
});

// @desc update payment method
// @route POST /api/v1/payments/update-payment-method
// @access Private

const updatePaymentMethod = asyncHandler(async (req, res) => {
  const { paymentMethodId } = req.body;
  try {
    const getUserId = req.user._id.toString();
    console.log(getUserId, "userId,,,,,,,,");

    const stripeCustomer = await PaymentMethod.findOne({ userId: getUserId });
    console.log(stripeCustomer, "stripeCustomer,,,,,,,,");

    if (!stripeCustomer) {
      return res.status(404).json(new ApiResponse(404, "Customer not found"));
    }

    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: stripeCustomer?.stripeCustomerId,
    });

    const customer = await stripe.customers.update(
      stripeCustomer?.stripeCustomerId,
      {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      }
    );

    await stripe.paymentMethods.detach(stripeCustomer?.paymentMethodId);
    stripeCustomer.paymentMethodId = paymentMethodId;
    await stripeCustomer.save();

    //finde user and update verifiedPayment
    const user = await User.findById({ _id: getUserId });
    if (!user) {
      return res.status(404).json(new ApiResponse(404, "User not found"));
    }
    user.paymentVerified = true;
    await user.save();

    res.status(200).json({ message: "Payment method updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, error?.message || "Internal server error"));
  }
});

// @desc checkout
// @route POST /api/v1/payments/checkout
// @access Private
const paymentCheckout = asyncHandler(async (req, res) => {
  try {
    // const lineItems = [
    //   {
    //     price_data: {
    //       currency: 'usd',
    //       product_data: {
    //         name: 'T-shirt',
    //       },
    //       unit_amount: 2000,
    //     },
    //     quantity: 1,
    //   },
    // ];
    const getUserId = req.user._id.toString();
    console.log(getUserId, "userId,,,,,,,,");
    if(!getUserId){
      return res.status(400).json(new ApiResponse(400, "User not found"));
    }


    const stripeCustomer = await PaymentMethod.findOne({ userId: getUserId });
    console.log(stripeCustomer, "stripeCustomerId,,,,,,,,");
    if(!stripeCustomer){
      return res.status(400).json(new ApiResponse(400, "Customer not found"));
    }

    console.log("checklk..,,,,");
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.sendProductData.lineItems,
      customer: stripeCustomer.StripeCustomerId,
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `http://localhost:5173/success/${req.body.sendProductData.id}`,
      cancel_url: "http://localhost:5173/cancel",
    });
    console.log("chkkkkkkkkkkkkkk,,,");

    return res.status(201).json(session);
  } catch (error) {
    return res
    .status(500)
    .json(new ApiResponse(500, error?.message || "Internal server error"));  }
});

export { 
  addPaymentMethodToCustomer,
   updatePaymentMethod ,
   paymentCheckout,
  };
