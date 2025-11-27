import Order from "../models/Order.js";
import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

export async function getAllOrders(req, res) {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
}

export async function updateOrderStatus(req, res) {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
}

export async function addProduct(req, res) {
  try {
    const { name, price, category, sizes, description, stock } = req.body;
    if (!name || !price || !category || !sizes)
      return res.status(400).json({ message: "Required fields missing" });

    let images = [];
    for (const file of req.files) {
      const upload = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "clothing_products" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        ).end(file.buffer);
      });
      images.push(upload.secure_url);
    }

    const product = new Product({
      name,
      price,
      category,
      sizes: sizes.split(","),
      description,
      stock,
      images,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}

export async function editProduct(req, res) {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
}

export async function deleteProduct(req, res) {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
}
