import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: { type: String, enum: ["hoodies", "oversized tshirts", "unisex"] },
  sizes: [{ type: String, enum: ["M", "L", "XL"] }],
  description: String,
  images: [String],
  stock: Number,
});

export default mongoose.model("Product", ProductSchema);
