import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const City = mongoose.model("City", citySchema);
export default City;