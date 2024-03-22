import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import cityService from "./cityService";



export const getAllCities=createAsyncThunk("city/getAllCities",async(_,thunkAPI)=>{
    try {
        return await cityService.getAllCities();
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
})


const initialState={
    cities:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:""

}

const citySlice = createSlice({
    name:"city",
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
        .addCase(getAllCities.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(getAllCities.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.cities=action.payload;
            state.message="";
        })
        .addCase(getAllCities.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })
        
        
    }
})


export const {reset} =citySlice.actions;
export default citySlice.reducer;