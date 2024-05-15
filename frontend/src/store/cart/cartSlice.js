import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";

import cartService from "./cartService"




export const getCartItems=createAsyncThunk("cart/getCartItems",async(_,thunkAPI)=>{
    try {
        return await cartService.getCartItems();
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
}
)

export const deleteCartItem=createAsyncThunk("cart/deleteCartItem",async(id,thunkAPI)=>{
    try {
        return await cartService.deleteCartItem(id);
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
})


const initialState={
    cartItems:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:""

}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        reset:(state)=>{
            state.isError=false;
            state.isSuccess=false;
            state.isLoading=false;
            state.message="";
        }
        


    },
    extraReducers:(builder) =>{
        builder
        .addCase(getCartItems.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(getCartItems.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.cartItems=action.payload;
            state.message="";
        })
        .addCase(getCartItems.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })
        .addCase(deleteCartItem.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(deleteCartItem.fulfilled,(state)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
        })
        .addCase(deleteCartItem.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        });
        
        
        
        
    }
})


export const {reset} =cartSlice.actions;
export default cartSlice.reducer;