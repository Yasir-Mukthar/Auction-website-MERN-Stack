import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { reset } from "../store/auth/authSlice";
import { getAllAuctions } from "../store/auction/auctionSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleAuction from "../components/SingleAuction";
import SearchLocationCategory from "../components/SearchLocationCategory";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import axios from "axios";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [auctionData, setAuctionData] = useState([]);

  const { auction, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auction
  );
  //console.log(auctionData);

  useEffect(() => {
    dispatch(getAllAuctions());
    //console.log("dispatched");
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setAuctionData(auction);
    } else if (isError) {
      toast.error(message);
    }
  }, [auction]);

  //pagination part
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(12);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = auctionData?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // 318f69a969db4f7599b7fbb5043e444e

  return (
    <div className="flex flex-col min-h-screen w-full  bg-[#061224] text-[#7386a8]">
      <div className="">
        <SearchLocationCategory />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4 max-w-[1400px] mx-auto">
          {" "}
          {auctionData &&
            currentItems.map((item, index) => (
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
      )}
      {auctionData && auctionData?.length !== 0 ? (
        <Pagination
          totalPosts={auctionData?.length}
          postsPerPage={itemsPerPage}
          paginate={paginate}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
