import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  deleteSingleAuctionById,
  getSellerAuction,
} from "../store/auction/auctionSlice";

const ManageItems = () => {
  const dispatch = useDispatch();
  const { sellerAuction } = useSelector((state) => state.auction);

  // componentDidMount and component
  useEffect(() => {
    dispatch(getSellerAuction());
  }, [dispatch]);
  console.log(sellerAuction, "sellerAuction....");

  const handleDeleteAuction = (id) => {
    console.log(id, "delete id....");
    dispatch(deleteSingleAuctionById(id));
    dispatch(getSellerAuction());
  };

  return (
    <div className="bg-green-800 text-white">
      <span className="px-2">img</span>
      <span className="px-2">name</span>
      <span className="px-2">category</span>
      <span className="px-2">total bids</span>
      <span className="px-2">status</span>
      <span className="px-2">currentPrice</span>
      <span className="px-2">view</span>
      <span className="px-2">edit</span>
      <span className="px-2">delete</span>

      {sellerAuction?.auctions?.map((auction) => (
        <div
          key={auction?._id}
          className="flex justify-between items-center p-4 border-b border-green-600"
        >
          <img
            src={auction?.image}
            alt="auction image"
            className="w-[50px] h-[50px] rounded-full"
          />
          <h1 className="px-2">{auction?.name}</h1>
          <h2 className="px-2">{auction?.category?.name}</h2>
          <h2 className="px-2">{auction?.bids?.length}</h2>
          <h2 className="px-2">{auction?.status}</h2>
          <h2 className="px-2">{auction?.startingPrice}</h2>
          <Link to={`/single-auction-detail/${auction?._id}`}>view</Link>
          <Link to={`/edit-auction/${auction?._id}`}>edit</Link>
          <button onClick={() => handleDeleteAuction(auction?._id)}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageItems;
