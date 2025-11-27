import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  mobile: String,
  email: String,
  name: String,
  address: {
    area: String,
    landmark: String,
    room: String,
    building: String,
    city: String,
    district: String,
    state: String,
    country: String,
  },
  paymentMethod: { type: String, default: "Cash on Delivery" },
  status: { type: String, default: "Pending" },
  items: Array,
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", OrderSchema);
