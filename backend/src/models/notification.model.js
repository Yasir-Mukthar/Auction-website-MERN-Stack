import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    type: { type: String, required: true },
    auction: { type: mongoose.Schema.Types.ObjectId, ref: "Auction" },

    isRead: { type: Boolean, default: false },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
