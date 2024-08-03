import axios from "axios";

const API_URL = "http://localhost:8000/api/v1";

const createAuction = async (data) => {
  //console.log("data..... create auction ........", data);
  try {
    const response = await axios.post(
      `${API_URL}/auctions/create-auction`,
      data,
      { withCredentials: true }
    );
    //console.log("response createAuction", response.data);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) || error.message;
    //console.error("Error with createAuction", error);
    return { message, isError: true };
  }
};

const getAllAuctions = async (data) => {
  try {
    //console.log(data, "data");
    const response = await axios.post(`${API_URL}/auctions`, data);
    //console.log("response getAllAuctions", response.data);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) || error.message;
    // //console.error("Error with getAllAuctions", error);
    return { message, isError: true };
  }
};

const getSingleAuctionById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/auctions/${id}`);
    //console.log("res.data", res.data);
    return res.data;
  } catch (err) {
    //console.error("Error in getSingleAuctionById", err);
    return null;
  }
};


//update auction status

const updateAuctionStatus = async (data) => {
  try {
    //console.log("data updateAuctionStatus", data);
    const response = await axios.post(
      `${API_URL}/auctions/${data.id}/status`,
      { status: data.status },
      { withCredentials: true }
    );
    //console.log("response updateAuctionStatus", response.data);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) || error.message;
    //console.error("Error with updateAuctionStatus", error);
    return { message, isError: true };
  }
};

const selectAuctionWinner = async (data) => {
  try {
    //console.log("data selectAuctionWinner", data);
    const response = await axios.get(
      `http://localhost:8000/api/v1/bids/${data.id}/winner`
    );
    //console.log("response selectAuctionWinner", response.data);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) || error.message;
    //console.error("Error with selectAuctionWinner", error);
    return { message, isError: true };
  }
};

const getSellerAuction = async () => {
  try {
    const response = await axios.get(`${API_URL}/auctions/user-auctions`, {
      withCredentials: true,
    });
    //console.log("response getSellerAuction", response.data);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) || error.message;
    //console.error("Error with getSellerAuction", error);
    return { message, isError: true };
  }
};

const deleteSingleAuctionById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/auctions/delete/${id}`, {
      withCredentials: true,
    });
    //console.log("response deleteSingleAuctionById", response.data);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) || error.message;
    //console.error("Error with deleteSingleAuctionById", error);
    return { message, isError: true };
  }
};

const deleteAuctionByAdminById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/auctions/admin-delete/${id}`, {
      withCredentials: true,
    });
    //console.log("response deleteSingleAuctionById", response.data);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) || error.message;
    //console.error("Error with deleteSingleAuctionById", error);
    return { message, isError: true };
  }
};

const updateSingleAuction=async(data)=>{
    //console.log(data.data, "data updateSingleAuction");

    try{
        const response = await axios.put(`${API_URL}/auctions/update/${data.id}`,data.data, {withCredentials:true});
        //console.log("response updateSingleAuction", response.data);
        return response.data;
    }catch(error){
        const message = (error.response && error.response.data.message) || error.message;
        //console.error("Error with updateSingleAuction", error);
        return {message, isError:true};
    }
}

const getWinnerDetail=async(id)=>{
    try{
        const response = await axios.get(`${API_URL}/auctions/${id}/winner`);
        //console.log("response getWinnerDetail", response.data);
        return response.data;
    }catch(error){
        const message = (error.response && error.response.data.message) || error.message;
        //console.error("Error with getWinnerDetail", error);
        return {message, isError:true};
    }
}


const getLiveAuctions=async()=>{
    try{
        const response = await axios.get(`${API_URL}/auctions/live-auctions`);
        //console.log("response getLiveAuctions", response.data);
        return response.data;
    }catch(error){
        const message = (error.response && error.response.data.message) || error.message;
        //console.error("Error with getLiveAuctions", error);
        return {message, isError:true};
    }
}

const getUpcomingAuctions=async()=>{
  try{
      const response = await axios.get(`${API_URL}/auctions/upcoming-auctions`);
      //console.log("response getLiveAuctions", response.data);
      return response.data;
  }catch(error){
      const message = (error.response && error.response.data.message) || error.message;
      //console.error("Error with getLiveAuctions", error);
      return {message, isError:true};
  }
}
const updatePaymentStatus=async(id)=>{
  try{
      const response = await axios.put(`${API_URL}/auctions/update-payment-status/${id}`,{
          withCredentials:true
      });
      //console.log("response getLiveAuctions", response.data);
      return response.data;
  }catch(error){
      const message = (error.response && error.response.data.message) || error.message;
      //console.error("Error with getLiveAuctions", error);
      return {message, isError:true};
  }

}


const auctionService = {
  getWinnerDetail,
  createAuction,
  getAllAuctions,
  getSingleAuctionById,
  updateAuctionStatus,
  selectAuctionWinner,
  getSellerAuction,
  deleteSingleAuctionById,
  updateSingleAuction,
  getLiveAuctions,
  getUpcomingAuctions,
  updatePaymentStatus,
  deleteAuctionByAdminById
};

export default auctionService;
