// src/cronJobs.js
import cron from 'node-cron';
import moment from "moment"
import Auction from './models/auction.model.js';
import Bid from './models/bid.model.js';
import Notification from './models/notification.model.js';
import Cart from './models/cart.model.js';
import { io } from "./index.js";



async function updateAuctionStatus(auctionId, status) {
  const auction = await Auction.findById(auctionId);

  auction.status = status;

  await auction.save();
}

async function selectAuctionWinner(auctionId) {
  console.log("selecting auction winner in cronJobs,,,,,,,,,,");
  io.emit("setStatus","auction ended.")
  const bids = await Bid.find({ auction: auctionId });
  console.log(bids, "auction.........");

 if(bids.length <= 0){
  return
 }

  let maxBidId = bids[0]._id;
  let maxAmount = bids[0].bidAmount;
  for (let i = 1; i < bids.length; i++) {
    if (bids[i].bidAmount > maxAmount) {
      maxAmount = bids[i].bidAmount;
      maxBidId = bids[i]._id;
    }
  }

  const auction = await Auction.findById(auctionId);
  const winnerUser = await Bid.findById(maxBidId).populate(
    "bidder",
    "_id fullName email phone profilePicture"
  );

  console.log(winnerUser, "winnerUser");

  auction.winner = maxBidId;
  auction.status = "over";

  await auction.save();

  await sendNotification(winnerUser,auction )
  

//first find the  user in cart then add item to that cart
  const userCart=await Cart.findOne({user:winnerUser.bidder._id});
  if(!userCart){
      await Cart.create({products:[auction._id],user:winnerUser.bidder._id});
  }else{
      userCart.products.push(auction._id);
      await userCart.save();
  }

  console.log(cartItem);
  
  

}

async function sendNotification(winner, auction){
  console.log("sending notificaton to userin cornjosb,,,,,,,,,,,,");

  //find auciton
  
  if (!auction || !winner) {
    return 
  }
  const type="AUCTION_ENDED"

  //check notification type
  if (type === "AUCTION_ENDED") {
    var notification = {
      user: null,
      message: `${winner?.bidder?.fullName} Won the  ${auction?.name}`,
      type: "AUCTION_ENDED",
      auction: auction?._id,
      link: `/single-auction-detail/${auction?._id}`,
    };
  }

    // Find all bids for the auction
    const bids = await Bid.find({ auction: auction?._id });

    // Get all unique user IDs from the bids
    const userIds = new Set(bids.map((bid) => bid?.bidder?.toString()));

    // Add the owner of the item to the user IDs
    userIds.add(auction.seller.toString());

    // Create a notification for each user ID
    userIds.forEach(async (id) => {
      notification.message = `${
        id === winner?.bidder?._id?.toString() ? "you" : winner?.bidder?.fullName
      } Won the ${auction?.name}`;

      await new Notification({ ...notification, user: id }).save();
    });

    
}

// Watch for new auctions
const changeStream = Auction.watch();

changeStream.on('change', (change) => {
  try{
    if (change.operationType === 'insert') {
      const auction = change.fullDocument;
  console.log("cronjobs,,,,,,,,,,,,,,,, are herer");
      // Schedule cron jobs for the new auction
      const startCronExpression = moment(auction.startTime).format('m H D M *');
      const endCronExpression = moment(auction.endTime).format('m H D M *');
  
      cron.schedule(startCronExpression, () => {
        updateAuctionStatus(auction._id, 'active');
      });
  
      cron.schedule(endCronExpression, async () => {
        await updateAuctionStatus(auction._id, 'over');
        await selectAuctionWinner(auction._id);
      });
    }

  } catch (err){
    console.log(err, "error in cronjobs")

  }
});


