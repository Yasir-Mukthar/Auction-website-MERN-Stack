// src/cronJobs.js
import cron from 'node-cron';
import moment from "moment"
import Auction from './models/auction.model.js';
import Bid from './models/bid.model.js';
import { io } from "./index.js";

// import { updateAuctionStatus } from "./controllers/auction.controller.js"
// import { getWinnerOfAuction } from './controllers/bid.controller.js';

async function updateAuctionStatus(auctionId, status) {
  // Fetch the auction from the database
  const auction = await Auction.findById(auctionId);

  // Update the auction status
  auction.status = status;

  // Save the auction
  await auction.save();
}
async function selectAuctionWinner(auctionId) {
  io.emit("setStatus","auction ended,,,,,,,")
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

  console.log(maxAmount, "maxAmount");
  console.log(maxBidId, "maxBid");
  const auction = await Auction.findById(auctionId);
  const winnerUser = await Bid.findById(maxBidId).populate(
    "bidder",
    "fullName email phone profilePicture"
  );

  console.log(winnerUser, "winnerUser");

  auction.winner = maxBidId;
  auction.status = "over";

  await auction.save();

}

// Watch for new auctions
const changeStream = Auction.watch();

changeStream.on('change', (change) => {
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
});


// Auction.find().then(auctions => {
//   auctions.forEach(auction => {
//     const startCronExpression = moment(auction.startTime).format('m H D M *');
//     const endCronExpression = moment(auction.endTime).format('m H D M *');
//     console.log(startCronExpression," , start time in cronjobs  .. ,,,", endCronExpression);

//     cron.schedule(startCronExpression, () => {
//       updateAuctionStatus(auction._id, 'active');
//       console.log("athe auction status in start updaing........");
//     });

//     cron.schedule(endCronExpression, () => {
//       updateAuctionStatus(auction._id, 'over');
//       selectAuctionWinner(auction._id);
//       console.log("The auction has ended cron jobs");
//     });
//   });
// });