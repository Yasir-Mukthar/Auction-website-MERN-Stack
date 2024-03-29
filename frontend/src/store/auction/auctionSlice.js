import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import auctionService from "./auctionService";

export const createAuction = createAsyncThunk(
  "auction/createAuction",
  async (payload, thunkAPI) => {
    console.log("payload", payload)
    try {
      return await auctionService.createAuction(payload);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) || error.message;
      return thunkAPI.rejectWithValue({ message, isError: true });
    }
  }
);

export const getAllAuctions = createAsyncThunk(
  "auction/getAllAuactions", async (payload, thunkAPI) => {

    try {
      return await auctionService.getAllAuctions(payload);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) || error.message;
      return thunkAPI.rejectWithValue({ message, isError: true });
    }
   
    }
  
);


export const getSingleAuctionById = createAsyncThunk(
  "auction/getSingleAuctionById",async (id, thunkAPI) => {

    try {
      return await auctionService.getSingleAuctionById(id);
    } catch (error) {
      const message = `${id} - ` + (error.response && error.response.data.message) || error.message;
      return thunkAPI.rejectWithValue({ message, isError: true });
    }
  }
)

export const updateAuctionStatus = createAsyncThunk(
  'auction/updateAuctionStatus', async (payload, thunkAPI) => {
    //directly chnage status
    try {
      return await auctionService.updateAuctionStatus(payload);
    } catch (error) {
      const message = (error.response && error.response.data.message) || error.message;
      return thunkAPI.rejectWithValue({ message, isError: true });
    }
  }
)

const initialState = {
  auction: [
    
  ],
  singleAuction : {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};
const auctionSlice = createSlice({
  name: "auction",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAuction.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(createAuction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = action.payload.message;
    });
    builder.addCase(createAuction.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload.message;
    });
    builder.addCase(getAllAuctions.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getAllAuctions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.auction = action.payload.data;
    });
    builder.addCase(getAllAuctions.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload.message;
    });
    builder.addCase(getSingleAuctionById.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getSingleAuctionById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.singleAuction = action.payload.data;
    });
    builder.addCase(getSingleAuctionById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload.message;
    });
  },
});

export const { reset } = auctionSlice.actions;
export default auctionSlice.reducer;
