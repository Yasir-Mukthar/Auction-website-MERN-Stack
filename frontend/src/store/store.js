
import { configureStore} from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import auctionReducer from './auction/auctionSlice';
import categoryReducer from './category/categorySlice';
import cityReducer from './city/citySlice';
import bidReducer from './bid/bidSlice';
import notificationReducer from './notification/notificationSlice';
import cartReducer from "./cart/cartSlice"
import userReducer from "./user/userSlice"

export const store= configureStore({
    reducer: {
        //reducers
        auth: authReducer,
        auction: auctionReducer,
        category: categoryReducer,
        city: cityReducer,
        bid: bidReducer,
        notification: notificationReducer,
        cart: cartReducer,
        user:userReducer,


        
    }
    ,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      
      serializableCheck: false,
    }),
});


