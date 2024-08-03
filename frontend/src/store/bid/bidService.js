import axios from "axios";


const API_URL = 'http://localhost:8000/api/v1';





export const placeABid=async(data)=>{
  //console.log(data, "bid data.....");
    const response = await axios.post(`${API_URL}/bids/${data.id}`,{amount:data.amount}, {withCredentials:true}); 
    
    return response.data;
};


export const getBidsAuctionsByUser=async()=>{
    const response = await axios.get(`${API_URL}/auctions/user-bids`, {withCredentials:true});
     //console.log("response bids auction...",response.data);
    return response.data;
};

export const getAllBidsForAuction=async(id)=>{
    const response = await axios.get(`${API_URL}/bids/get-all-bids/${id}`, {withCredentials:true});
    //console.log("response getallBids for Auctions,,,,,,,,...",response.data);

    return response.data;
}








const bidService= {
    placeABid,
    getAllBidsForAuction,
    getBidsAuctionsByUser
}


export default bidService;