import Product from "../models/Product.js";

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
}

export async function getProductDetails(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
}
