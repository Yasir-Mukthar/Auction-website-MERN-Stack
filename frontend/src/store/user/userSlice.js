import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

export const getAllUsers=createAsyncThunk("user/getAllUsers",async(_,thunkAPI)=>{
    try {
        return await userService.getAllUsers();
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        return thunkAPI.rejectWithValue({message,isError:true});
    }
})


const initialState={
    allUser:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:""
}

const userSlice = createSlice({
    name:"allUser",
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
        .addCase(getAllUsers.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getAllUsers.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.allUser=action.payload;
        })
        .addCase(getAllUsers.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload.message;
        })
        
    }
})

export const {reset} =userSlice.actions;
export default userSlice.reducer;
