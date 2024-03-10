import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { reset } from "../store/auth/authSlice"
import { getAllAuctions } from "../store/auction/auctionSlice"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import CountDownTimer from "../components/CountDownTimer"


const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {auction, isLoading, isError, isSuccess, message} = useSelector(state => state.auction)
    const [auctionData , setAuctionData] = useState([])

useEffect(() => {

    dispatch(getAllAuctions())
    if(isSuccess){
        setAuctionData(auction)
        console.log(auctionData, "auction data")
    }else if(isError){
        toast.error(message)
    }

    return () => {
        dispatch(reset())
    }
},[auction ])


  
    
  return (
    <div className="flex h-screen w-full  bg-[#061224] text-[#7386a8]">
        <div>
            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
            <div className="flex flex-wrap gap-4">
                {auctionData.map((item, index) => (
                    <div key={index} className="flex flex-col gap-5">
                        <span>{item.name}</span>
                        <span>{item.startingPrice}</span>
                        <span>{item.category}</span>
                        <span>{item.startTime}</span>
                        <span>{item.endTime}</span>
                        <CountDownTimer startTime={item.startTime} endTime={item.endTime}/>
                        <span>{item.location}</span>
                        <span>{item.description}</span>
                    </div>
                ))}
            </div>
        </div>
      
    </div>
  );
};
  

export default Dashboard