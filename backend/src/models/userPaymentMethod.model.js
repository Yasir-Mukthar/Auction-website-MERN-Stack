import mongoose from "mongoose";

const userPaymentMehtodSchema = new mongoose.Schema({
    stripeCustomerId: { type: String },
    paymentMethodId: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
},
{
  timestamps: true,
});

const PaymentMethod = mongoose.model("PaymentMethod", userPaymentMehtodSchema);
export default PaymentMethod;