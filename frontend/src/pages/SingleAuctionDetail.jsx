import { useEffect, useState } from "react";
import itemimg from "../assets/Behance_Animation_2d.jpg";
import avatar from "../assets/avatar.jpg";
import avatar2 from "../assets/avatar2.jpg";
//useParams
import { useParams } from "react-router-dom";
import { useSelector , useDispatch} from "react-redux";
import { getSingleAuctionById } from "../store/auction/auctionSlice";
import CountDownTimer from "../components/CountDownTimer";


let singleAuction={
    name: "NFT Art",
    image: itemimg,
    category: "Art",
    location: "Lahore",
    creator: "John Doe",
    collection: "Modern Art",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
    currentBid: 5000,
    timeLeft: "2 days 5 hours 30 minutes",
    
    startPrice: 1000,

    seller: {
        profilePicture: avatar,
        fullName: "John Doe"}


}

const SingleAuctionDetail = () => {

const [activeTab, setActiveTab] = useState("description");
const params = useParams();
const dispatch = useDispatch();
const { singleAuction, isLoading } = useSelector(state => state.auction);

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
        <button className={`px-5 py-2 rounded-xl   ${activeTab === "description" ? "bg-color-primary"  : "bg-theme-bg2 text-body-text-color"}`}
        onClick={() => setActiveTab("description")}
        >
          Details
        </button>
        <button className={`px-5 py-2 rounded-xl   ${activeTab === "bids" ? "bg-color-primary"  : "bg-theme-bg2 text-body-text-color"}`}
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
            <p className="text-body-text-color">
                {singleAuction?.description}
            
            </p>
        
               
        </div>
        {/* Bids */}
        <div
          id="bids"
          className={`pt-4 border-t border-border-info-color ${
            activeTab === "bids" ? "block" : "hidden"
          }`}
        >  
        {/* here i want to show users who bids and their amount and time of bid */}

        
        <div className="flex sm:gap-10 items-center border mt-2 justify-between md:w-[80%] py-1 px-2 md:px-5 border-theme-bg-light rounded-full">
            <div className="flex gap-4 items-center text-white">
                <img src={avatar2} alt="" className="w-10 h-10 rounded-full" />
                <div className="flex flex-col">
                    <span className="font-semibold">John Doe</span>
                    <span className="text-xs text-body-text-color">2 days ago</span>
                </div>
            </div>
            <div className="text-white">Bid Amount : $56789</div>
        </div> 
            

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
      {/* <div className="flex flex-wrap gap-2.5 pt-4">
        <div className="flex flex-col py-1 px-4 rounded-2xl border border-border-info-color bg-theme-bg">
          <span className="text-theme-color py-1">background</span>
          <h6 className="font-medium">navy Blue</h6>
          <p className="text-body-text-color normal-case">
            5% have this trait
          </p>
        </div>
        <div className="flex flex-col py-1 px-4 rounded-2xl border border-border-info-color bg-theme-bg">
          <span className="text-theme-color py-1">mouth grade</span>
          <h6 className="font-medium">Fresh</h6>
          <p className="text-body-text-color normal-case">
            3% have this trait
          </p>
        </div>
        <div className="flex flex-col py-1 px-4 rounded-2xl border border-border-info-color bg-theme-bg">
          <span className="text-theme-color py-1">head</span>
          <h6 className="font-medium">Bowlcut</h6>
          <p className="text-body-text-color normal-case">
            8% have this trait
          </p>
        </div>
        <div className="flex flex-col py-1 px-4 rounded-2xl border border-border-info-color bg-theme-bg">
          <span className="text-theme-color py-1">body</span>
          <h6 className="font-medium">red</h6>
          <p className="text-body-text-color normal-case">
            6% have this trait
          </p>
        </div>
        <div className="flex flex-col py-1 px-4 rounded-2xl border border-border-info-color bg-theme-bg">
          <span className="text-theme-color py-1">accessory</span>
          <h6 className="font-medium">metal headband</h6>
          <p className="text-body-text-color normal-case">
            5% have this trait
          </p>
        </div>
        <div className="flex flex-col py-1 px-4 rounded-2xl border border-border-info-color bg-theme-bg">
          <span className="text-theme-color py-1">skin</span>
          <h6 className="font-medium">dark brown</h6>
          <p className="text-body-text-color normal-case">
            9% have this trait
          </p>
        </div>
      </div> */}
    </div>

    {/* countdown timer */}

    <div className="flex flex-col gap-4 pt-4 border-t border-border-info-color">
        <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
        <h3 className="text-heading-color font-medium">Current Bid</h3>
        <p className="text-body-text-color">${singleAuction?.startingPrice}</p>
      </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-heading-color font-medium">Time Left</h3>
                <p className="text-body-text-color"><CountDownTimer  startTime={singleAuction?.startTime} endTime={singleAuction?.endTime} /></p> 
                
            </div>
            
        </div>
        
    </div>



    {/* // detail about current bid and timer  */}
    <div
    className=" flex flex-col gap-4 pt-4 border-t border-border-info-color"
    >
    <div className="flex justify-between items-center">
      {/* input button for bid */}
        <input
            type="text"
            className=" py-3 mt-2 px-2 outline-none border-none rounded-lg"
            placeholder="Enter your bid"

        />
      <button
        className="px-5 py-2 rounded-xl bg-color-primary text-white"
      >
        Place Bid
      </button>
    </div>
        

    </div>
  </div>
</div>

 
 
);
};

export default SingleAuctionDetail;
