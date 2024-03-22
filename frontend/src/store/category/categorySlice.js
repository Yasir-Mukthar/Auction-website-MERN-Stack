import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import categoryService from "./categoryService";
import { getAllCities } from "../city/cityService";




export const getAllCategories=createAsyncThunk("category/getAllCategories",async(_,thunkAPI)=>{
    try {
        return await categoryService.getAllCategories();
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
})




const initialState={
    categories:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:""

}

const categorySlice = createSlice({
    name:"category",
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
        .addCase(getAllCategories.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(getAllCategories.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.categories=action.payload;
            state.message="";
        })
        .addCase(getAllCategories.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })
        
        
    }
})


export const {reset} =categorySlice.actions;
export default categorySlice.reducer;