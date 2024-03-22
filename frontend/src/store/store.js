
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import auctionReducer from './auction/auctionSlice';
import categoryReducer from './category/categorySlice';
import cityReducer from './city/citySlice';

export const store= configureStore({
    reducer: {
        //reducers
        auth: authReducer,
        auction: auctionReducer,
        category: categoryReducer,
        city: cityReducer,
        
    }
});


