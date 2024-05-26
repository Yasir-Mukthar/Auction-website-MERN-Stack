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


//get a single user by id
export const getUserById=createAsyncThunk("user/getUserById",async(data,thunkAPI)=>{
    try {
        return await userService.getUserById(data)
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
})

//update user by id
export const updateUserById=createAsyncThunk("user/updateUserById",async(data,thunkAPI)=>{
    try {
        return await userService.updateUserById(data)
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
})

//delete a user by id
export const deleteUserById=createAsyncThunk("user/deleteUserById", async(data, thunkAPI)=>{
    try {
        return await userService.deleteUserById(data);
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }

})

//get top selllers
export const getTopSellers=createAsyncThunk("user/getTopSellers",async(_,thunkAPI)=>{
    try {
        return await userService.getTopSellers();
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        return thunkAPI.rejectWithValue({message,isError:true});
    }
})

const initialState={
    allUser:[],
    singleUser:null,
    topSellers:[],
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
        .addCase(getUserById.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getUserById.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.singleUser=action.payload;
        })
        .addCase(getUserById.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload.message;
        })
        .addCase(updateUserById.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(updateUserById.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.message=action.payload.message;
            state.singleUser=action.payload


        })
        .addCase(updateUserById.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload.message;
        })
        .addCase(deleteUserById.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(deleteUserById.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.message=action.payload.message;
        })
        .addCase(deleteUserById.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload.message;
        })
        .addCase(getTopSellers.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getTopSellers.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.topSellers=action.payload;
        })
        .addCase(getTopSellers.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload.message;
        })


        
    }
})

export const {reset} =userSlice.actions;
export default userSlice.reducer;
