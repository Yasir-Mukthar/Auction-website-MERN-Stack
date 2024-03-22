
import axios  from "axios";


const API_URL = 'http://localhost:8000/api/v1';


const createAuction=async (data)=>{
    console.log('data', data);
    try{
        const response = await axios.post(`${API_URL}/auctions`, data, {withCredentials: true});
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





const auctionService = {
 createAuction
    ,getAllAuctions
}

export default auctionService;
