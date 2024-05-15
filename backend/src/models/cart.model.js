import { Schema,mongoose } from "mongoose";

const cartSchema = new Schema({
    user: { type: 
        Schema.Types.ObjectId, ref: "User" , required: true },
    products: [
        {
            type: Schema.Types.ObjectId, ref: "Auction", required: true
        }
        
       
    ],
});


const Cart = mongoose.model("Cart", cartSchema);
export default Cart;