
const BidCard = (bid) => {


  return (
    <div className="flex sm:gap-10 items-center border mt-2 justify-between md:w-[80%] py-1 px-2 md:px-5 border-theme-bg-light rounded-full">
    <div className="flex gap-4 items-center text-white">
        <img src={bid?.bid?.bidder?.profilePicture}  alt="bidder profilePicture" className="w-10 h-10 rounded-full" />
        <div className="flex flex-col">
            <span className="font-semibold">{bid?.bid?.bidder?.fullName}</span>
            <span className="text-xs text-body-text-color">
                {new Date(bid?.bid?.bidTime).toLocaleDateString()} {""}
                {new Date(bid?.bid?.bidTime).toLocaleTimeString()}
            </span>
        </div>
    </div>
    <div className="text-white">Bid Amount : ${bid?.bid?.bidAmount}</div>
</div> 
  )
}

export default BidCard