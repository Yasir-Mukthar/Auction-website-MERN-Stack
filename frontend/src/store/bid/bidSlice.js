import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import bidService from "./bidService";



export const placeABid=createAsyncThunk(
    'bid/placeABid',
    async (data,{rejectWithValue})=>{
        try{
            const response = await bidService.placeABid(data);
            return response;
        }catch(error){
            return rejectWithValue(error.response.data);
        }
    }
)




const initialState={
    bids:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:""

}

const bidSlice = createSlice({
    name:"bid",
    initialState,
    reducers:{
        reset:(state)=>{
            state.isError=false;
            state.isSuccess=false;
            state.isLoading=false;
            state.message="";
        }
        


    },
    extraReducers:() =>{
       
        
        
    }
})


export const {reset} =bidSlice.actions;
export default bidSlice.reducer;