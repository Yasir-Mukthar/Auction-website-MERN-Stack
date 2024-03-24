
import axios  from "axios";


const API_URL = 'http://localhost:8000/api/v1';


const createAuction=async (data)=>{
    console.log('data', data);
    try{
        const response = await axios.post(`${API_URL}/auctions/create-auction`, data, {withCredentials: true});
        console.log('response createAuction', response.data);
        return response.data;

    }catch(error){
        const message =
            (error.response && error.response.data.message) || error.message;
            console.error("Error with createAuction", error);
        return { message, isError: true };
    }
}

const getAllAuctions = async (data) => {
    try {
        console.log(data,"data");
        const response = await axios.post(`${API_URL}/auctions`,data);
        console.log('response getAllAuctions', response.data)
        return response.data;
    } catch (error) {
        const message =
            (error.response && error.response.data.message) || error.message;
       // console.error("Error with getAllAuctions", error);
        return { message, isError: true };
    }
}


const getSingleAuctionById = async (id) => {
    try {
        const res =await axios.get(`${API_URL}/auctions/${id}`);  
        console.log('res.data',res.data);  
        return res.data;
        
    } catch (err) {
        console.error("Error in getSingleAuctionById", err);
        return null;
    }
};




const auctionService = {
 createAuction
    ,getAllAuctions
    ,getSingleAuctionById
}

export default auctionService;
