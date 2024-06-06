import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk("auth/register",async (payload,thunkAPI)=>{
    try {
        return await authService.register(payload);
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
})

export const login = createAsyncThunk("auth/login",async (payload,thunkAPI)=>{
    try {
        return await authService.login(payload);
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        console.log(message, "error message")
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
})

export  const logout= createAsyncThunk('auth/logout', async(_, thunkAPI) =>{
   
    try {
        return await authService.logout();
        
    } catch (error) {
        console.log(error.message, "error message")
        return thunkAPI.rejectWithValue({message:error.message,isError:true});
    }
    
})

export const forgotPasswordSendMail= createAsyncThunk('auth/forgotPasswordSendMail', async(payload, thunkAPI) =>{
    try {
        return await authService.forgotPasswordSendMail(payload);
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        console.log(message, "error message")
        
        return thunkAPI.rejectWithValue({message,isError:true});
    }
    
})

export const resetNewPassword = createAsyncThunk('auth/resetNewPassword', async(payload, thunkAPI) =>{
    try {
        return await authService.resetNewPassword(payload);
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        console.log(message, "error message")
        
        return thunkAPI.rejectWithValue({message,isError:true});
    }
    
})

export const changeCurrentPassword= createAsyncThunk('auth/changeCurrentPassword', async(payload, thunkAPI) =>{
    try {
        return await authService.changeCurrentPassword(payload);
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        console.log(message, "error message")
        
        return thunkAPI.rejectWithValue({message,isError:true});
    }
    
})


export const getCurrentUser= createAsyncThunk('auth/getCurrentUser', async(_, thunkAPI) =>{
    try {
        return await authService.getCurrentUser();
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        console.log(message, "error message")
        
        return thunkAPI.rejectWithValue({message,isError:true});
    }
    
})

export const updateProfile= createAsyncThunk('auth/updateProfile', async(payload, thunkAPI) =>{
    try {
        return await authService.updateProfile(payload);
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        console.log(message, "error message")
        
        return thunkAPI.rejectWithValue({message,isError:true});
    }
    
})



const initialState={
    user:user ? user : null,
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:""

}

const authSlice = createSlice({
    name:"auth",
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
        .addCase(register.pending, (state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(register.fulfilled, (state, action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.message=action.payload.message;
        })
        .addCase(register.rejected, (state, action)=>{
            state.isLoading=false;
            
            state.isError=true;
            state.message=action.payload.message;
        })
    
    .addCase(login.pending, (state)=>{
        state.isLoading=true;
        state.isError=false;
        state.isSuccess=false;
        state.message="";
    })
    .addCase(login.fulfilled, (state, action)=>{
        state.isLoading=false;
        state.isSuccess=true;
        state.message=action.payload.message;
        state.user=action.payload.data.user;
    })
    .addCase(login.rejected, (state, action)=>{
        state.isLoading=false;
        state.isError=true;
        state.message=action.payload.message;

    })
    .addCase(logout.pending, (state)=>{
        state.isLoading=true;
        state.isError=false;
        state.isSuccess=false;
        state.user=null;
    })
    .addCase(logout.fulfilled, (state, action)=>{
        state.isLoading=false;
        state.isSuccess=true;
        state.message=action.payload.message;
    })
    .addCase(logout.rejected, (state, action)=>{
        state.isLoading=false;
        state.isError=true;
        state.message=action.payload.message;
    })
    .addCase(forgotPasswordSendMail.pending, (state)=>{
        state.isLoading=true;
        state.isError=false;
        state.isSuccess=false;
        state.message="";
    })
    .addCase(forgotPasswordSendMail.fulfilled, (state, action)=>{
        state.isLoading=false;
        state.isSuccess=true;
        state.message=action.payload.message;
    })
    .addCase(forgotPasswordSendMail.rejected, (state, action)=>{
        state.isLoading=false;
        state.isError=true;
        state.message=action.payload.message;
    })
    .addCase(resetNewPassword.pending, (state)=>{
        state.isLoading=true;
        state.isError=false;
        state.isSuccess=false;
        state.message="";
    })
    .addCase(resetNewPassword.fulfilled, (state, action)=>{
        state.isLoading=false;
        state.isSuccess=true;
        state.message=action.payload.message;
    })
    .addCase(resetNewPassword.rejected, (state, action)=>{
        state.isLoading=false;
        state.isError=true;
        state.message=action.payload.message;
    })
    .addCase(changeCurrentPassword.pending, (state)=>{
        state.isLoading=true;
        state.isError=false;
        state.isSuccess=false;
        state.message="";
    })
    .addCase(changeCurrentPassword.fulfilled, (state, action)=>{
        state.isLoading=false;
        state.isSuccess=true;
        state.message=action.payload.message;
    })
    .addCase(changeCurrentPassword.rejected, (state, action)=>{
        state.isLoading=false;
        state.isError=true;
        state.message=action.payload.message;
    })
    .addCase(getCurrentUser.pending, (state)=>{
        state.isLoading=true;
        state.isError=false;
        state.isSuccess=false;
        state.message="";
    })
    .addCase(getCurrentUser.fulfilled, (state, action)=>{
        state.isLoading=false;
        state.isSuccess=true;
        state.user=action.payload.data.user;
    })
    .addCase(getCurrentUser.rejected, (state, action)=>{
        state.isLoading=false;
        state.isError=true;
        state.message=action.payload.message;
    })
    .addCase(updateProfile.pending, (state)=>{
        state.isLoading=true;
        state.isError=false;
        state.isSuccess=false;
        state.message="";
    })
    .addCase(updateProfile.fulfilled, (state, action)=>{
        state.isLoading=false;
        state.isSuccess=true;
        state.message=action.payload.message;
        state.user=action.payload.data.user;
    })
    .addCase(updateProfile.rejected, (state, action)=>{
        state.isLoading=false;
        state.isError=true;
        state.message=action.payload.message;
            });



    }
})



export const {reset} = authSlice.actions;

export default authSlice.reducer;




