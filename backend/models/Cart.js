import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  mobile: String,
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      size: String,
      quantity: Number,
      image: String,
    }
  ],
});

export default mongoose.model("Cart", CartSchema);
