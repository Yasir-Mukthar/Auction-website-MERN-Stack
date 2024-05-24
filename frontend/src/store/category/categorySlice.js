import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import categoryService from "./categoryService";




export const getAllCategories=createAsyncThunk("category/getAllCategories",async(_,thunkAPI)=>{
    try {
        return await categoryService.getAllCategories();
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
})

//create category
export const createCategory=createAsyncThunk("category/createCategory",async(data,thunkAPI)=>{
    try {
        return await categoryService.createCategory(data);
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
})

//get a single category
export const getSingleCategory=createAsyncThunk("category/getSingleCategory",async(id,thunkAPI)=>{
    try {
        return await categoryService.getSingleCategory(id);
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
})

//update category
export const updateCategory=createAsyncThunk("category/updateCategory",async(data,thunkAPI)=>{
    try {
        return await categoryService.updateCategory(data);
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
})

//delete category
export const deleteCategory=createAsyncThunk("category/deleteCategory",async(id,thunkAPI)=>{
    try {
        return await categoryService.deleteCategory(id);
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
})

//get more detail about categories
export const getCategoriesMoreDetail=createAsyncThunk("category/getCategoriesMoreDetail",async(_,thunkAPI)=>{
    try {
        return await categoryService.getCategoriesMoreDetail();
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
})

//top 5 categories
export const getTopCategories=createAsyncThunk("category/getTopCategories",async(_,thunkAPI)=>{
    try {
        return await categoryService.getTopCategories();
        
    } catch (error) {
        const message =(error.response && error.response.data.message) || error.message;
        
        return thunkAPI.rejectWithValue({message,isError:true});
        
    }
}
)


const initialState={
    categories:[],
    singleCategory:null,
    categoriesDetail:null,
    topCategories:null,
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
        .addCase(createCategory.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(createCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.message=action.payload.message;
        })
        .addCase(createCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })
        .addCase(getSingleCategory.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(getSingleCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.singleCategory=action.payload;
            state.message="";
        })
        .addCase(getSingleCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })
        .addCase(updateCategory.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(updateCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.message=action.payload.message;
        })
        .addCase(updateCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })
        .addCase(deleteCategory.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(deleteCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.message=action.payload.message;
        })
        .addCase(deleteCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })
        .addCase(getCategoriesMoreDetail.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(getCategoriesMoreDetail.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.categoriesDetail=action.payload;
            state.message="";
        })
        .addCase(getCategoriesMoreDetail.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })
        .addCase(getTopCategories.pending,(state)=>{
            state.isLoading=true;
            state.isError=false;
            state.isSuccess=false;
            state.message="";
        })
        .addCase(getTopCategories.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.topCategories=action.payload;
            state.message="";
        })
        .addCase(getTopCategories.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.message;
        })




        
        
    }
})


export const {reset} =categorySlice.actions;
export default categorySlice.reducer;