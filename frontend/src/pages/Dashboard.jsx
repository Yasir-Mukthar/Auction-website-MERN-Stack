import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { reset } from "../store/auth/authSlice";
import { getAllAuctions } from "../store/auction/auctionSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleAuction from "../components/SingleAuction";
import SearchLocationCategory from "../components/SearchLocationCategory";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [auctionData, setAuctionData] = useState([]);

  const { auction, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auction
  );
  console.log(auctionData);

  useEffect(() => {
    dispatch(getAllAuctions());
    console.log("dispatched");
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setAuctionData(auction);
    } else if (isError) {
      toast.error(message);
    }
  }, [auction]);

  return (
    <div className="flex flex-col min-h-screen w-full  bg-[#061224] text-[#7386a8]">
      <div className="">
        <SearchLocationCategory />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4 max-w-[1400px] mx-auto">
        {" "}
        {auctionData &&
          auctionData.map((item, index) => (
            <div key={index}>
              <SingleAuction
                name={item?.name}
                startingPrice={item?.startingPrice}
                image={item?.image}
                endTime={item?.endTime}
                startTime={item?.startTime}
                id={item?._id}
                status={item?.status}
                sellerImage={item?.seller?.profilePicture}
                sellerName={item?.seller?.fullName}
                sellerId={item?.seller?._id}
                bidLength={item?.bids?.length}
                winnerFullName={item?.winner?.bidder?.fullName}
                winnerProfilePicture={item?.winner?.bidder?.profilePicture}
                winnerBidAmount={item?.winner?.bidAmount}
                winnerBidTime={item?.winner?.bidTime}
              />
            </div>
          ))}{" "}
      </div>

      {/* <div>
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
        </div> */}
    </div>
  );
};

export default Dashboard;
