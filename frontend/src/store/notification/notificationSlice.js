import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import notificationService from "./notificationService";



export const getNotificationForUser= createAsyncThunk("notification/getNotificationForUser",async(_,thunkAPI)=>{
    try {
        return await notificationService.getNotificationForUser();
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
})  

export const markNotificationAsRead= createAsyncThunk("notification/markNotificationAsRead",async(id,thunkAPI)=>{
    try {
        return await notificationService.markNotificationAsRead(id);
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
})


const initialState={
    notifications:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:""

}

const notificationSlice = createSlice({
    name:"notification",
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
        .addCase(getNotificationForUser.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(getNotificationForUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.notifications=action.payload.data;
            state.message="";
        })
        .addCase(getNotificationForUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })
        .addCase(markNotificationAsRead.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(markNotificationAsRead.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.message=action.payload.message;
        })
        .addCase(markNotificationAsRead.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })
        
        
        
    }
})


export const {reset} =notificationSlice.actions;
export default notificationSlice.reducer;