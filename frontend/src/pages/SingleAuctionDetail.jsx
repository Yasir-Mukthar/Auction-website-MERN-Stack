import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleAuctionById } from "../store/auction/auctionSlice";
import CountDownTimer from "../components/CountDownTimer";
import BidCard from "../components/BidCard";
import { placeABid } from "../store/bid/bidSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";






const SingleAuctionDetail = () => {
  const [newBidAmount, setNewBidAmount] = useState("");
  const logInUser = JSON.parse(localStorage.getItem("user"));
  console.log(logInUser, "logInUser");
  const [activeTab, setActiveTab] = useState("description");
  const params = useParams();
  const dispatch = useDispatch();
  const { singleAuction, isLoading } = useSelector((state) => state.auction);

  console.log(params.id);
  console.log(singleAuction);
  console.log(isLoading);

  useEffect(() => {
    console.log("useEffect is running.....");
    dispatch(getSingleAuctionById(params.id));
  }, []);

  if (isLoading) {
    return <h1 className="text-white">Loading...</h1>;
  }

  if (!singleAuction) {
    return null; // or handle the case when singleAuction is undefined
  }

  const placeBidHandle = (e) => {
    e.preventDefault();

    let bidData = {
      id: params.id,
      amount: newBidAmount,
    };
    if(newBidAmount <= singleAuction?.startingPrice){
      toast.info('Bid amount should be greater than the currnt bid')
      console.log(new Date().getTime() / 1000 + ' seconds');
    }else if( singleAuction?.endTime < new Date().getTime() / 1000 ){
      toast.info('Auction time is over')
    }
    else{
      dispatch(placeABid(bidData));
      setNewBidAmount("");
      setActiveTab("bids");
    }

    
  };

  // Rest of your code

  return (
    <div
      className=" place-content-between p-10 flex pt-40 items-start gap-7 flex-wrap lg:flex-nowrap"
      id="item01"
    >
      <img
        className=" object-fill   lg:min-w-[35%] h-[600px] lg:h-[600px]   rounded-xl min-w-48 max-w-3xl "
        src={singleAuction?.image}
        alt="product image"
      />
      <div className="lg:min-w-[50%] lg:w-1/2 flex gap-4 flex-col ">
        <div>
          <h2 className="text-3xl font-extrabold text-white">
            {singleAuction?.name}
          </h2>
          {/* <p className="pt-4 text-body-text-color font-semibold">
        Sale Price:
        <span className="font-extrabold text-color-danger"> 5.63ETH</span>
      </p> */}
          <div className="pt-4 flex flex-row gap-4 flex-wrap text-body-text-color capitalize">
            <a
              href="#"
              className="px-4 py-1 border rounded-full hover:bg-color-primary border-border-info-color hover:text-white transition-all"
            >
              {singleAuction?.category?.name}
            </a>
            <a
              href="#"
              className="px-4 py-1 border rounded-full hover:bg-color-primary border-border-info-color hover:text-white transition-all"
            >
              {singleAuction?.location?.name}
            </a>
          </div>

          {/* border */}
        </div>

        <div className="pt-4 border-t border-border-info-color">
          {/* Creator */}
          <div className="flex gap-8">
            <div id="author-item" className="text-heading-color">
              <span className="font-medium capitalize  ">Seller</span>
              <div id="author-info" className="flex items-center gap-2 pt-2">
                <img
                  src={singleAuction?.seller?.profilePicture}
                  alt="avatar"
                  className="w-[45px] rounded-full"
                />
                <a href="#" className="font-medium ">
                  {singleAuction?.seller?.fullName}
                </a>
              </div>
            </div>
            {/* Creator */}
            {/* <div id="author-item" className="text-heading-color capitalize">
          <span className="font-medium  ">Collection</span>
          <div id="author-info" className="flex items-center gap-2 pt-2">
            <img
              src={avatar2}
              alt=""
              className="w-[45px] h-[45px] rounded-full"
            />
            <a href="#" className="font-medium">
              modern art
            </a>
          </div>
        </div> */}
          </div>
          {/* TABS buttons */}
          <div className="flex gap-4 pt-4 font-bold text-white ">
            <button
              className={`px-5 py-2 rounded-xl   ${
                activeTab === "description"
                  ? "bg-color-primary"
                  : "bg-theme-bg2 text-body-text-color"
              }`}
              onClick={() => setActiveTab("description")}
            >
              Details
            </button>
            <button
              className={`px-5 py-2 rounded-xl   ${
                activeTab === "bids"
                  ? "bg-color-primary"
                  : "bg-theme-bg2 text-body-text-color"
              }`}
              onClick={() => setActiveTab("bids")}
            >
              Bids
            </button>
          </div>
        </div>
        <div>
          {/* Description */}
          <div
            id="description"
            className={`pt-4 border-t border-border-info-color ${
              activeTab === "description" ? "block" : "hidden"
            }`}
          >
            <h3 className="text-heading-color font-medium">Description</h3>
            <p className="text-body-text-color">{singleAuction?.description}</p>
          </div>
          {/* Bids */}
          <div
            id="bids"
            className={`pt-4 border-t border-border-info-color max-h-[250px] overflow-y-auto  ${
              activeTab === "bids" ? "block" : "hidden"
            } no-scrollbar`}
          >
            {/* here i want to show users who bids and their amount and time of bid */}

            {/* map over bids array */}
            {singleAuction?.bids?.length > 0 ? (
              singleAuction?.bids?.map((bid) => (
                <BidCard key={bid._id} bid={bid} />
              ))
            ) : (
              <h1 className="text-white">No bids yet</h1>
            )}
          </div>

          {/* History */}
          {/* <div
          id="history"
          className={`pt-4 border-t border-border-info-color ${
            activeTab === "history" ? "block" : "hidden"
          }`}
        ></div> */}
        </div>
        {/* Owner*/}
        {/* <div
      id="author-item"
      className="pt-4 border-t border-border-info-color text-heading-color"
    >
      <span className="font-medium capitalize ">Owner</span>
      <div id="author-info" className="flex items-center gap-2 pt-2">
        <img src={avatar3} alt="" className="w-[45px] rounded-full" />
        <a href="#" className="font-medium">
          @donel_tryon
        </a>
      </div>
    </div> */}
        <div className="text-heading-color capitalize">
          {/* property */}
          {/* <span className="font-medium ">Property</span> */}
          {/* property wrap */}
         
        </div>

        {/* countdown timer */}

        <div className="flex flex-col gap-4 pt-4 border-t border-border-info-color">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <h3 className="text-heading-color font-medium">Current Bid</h3>
              <p className="text-body-text-color">
                ${singleAuction?.startingPrice}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-heading-color font-medium">Time Left</h3>
              <p className="text-body-text-color">
                <CountDownTimer
                  startTime={singleAuction?.startTime}
                  endTime={singleAuction?.endTime}
                />
              </p>
            </div>
          </div>
        </div>

        {/* // detail about current bid and timer  */}
        <div className=" flex flex-col gap-4 pt-4 border-t border-border-info-color ">
          <form
            className="flex justify-between items-center"
            onSubmit={placeBidHandle}
          >
            {/* input button for bid */}
            <input
              type="number"
              className=" py-3 mt-2 px-2 outline-none border-none rounded-lg"
              placeholder="Enter your bid"
              value={newBidAmount}
              onChange={(e) => setNewBidAmount(e.target.value)}
              required
            />
            {logInUser ? (
              <button
                type="submit"
                disabled={
                  singleAuction?.seller?._id === logInUser?._id ? true : false
                }
                className={`bg-color-primary py-2 px-4 rounded-lg cursor-pointer text-white ${
                  singleAuction?.seller?._id === logInUser?._id
                    ? "bg-theme-bg2 text-body-text-color"
                    : "bg-color-primary "
                } `}
              >
                Place Bid
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-color-primary py-2 px-4 rounded-lg cursor-pointer text-white"
              >
                Place Bid
              </Link>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleAuctionDetail;
