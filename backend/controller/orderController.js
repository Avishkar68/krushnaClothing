import Order from "../models/Order.js";

export async function placeOrder(req, res) {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json(order);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
}

export async function getUserOrders(req, res) {
  try {
    const orders = await Order.find({ mobile: req.params.mobile });
    res.json(orders);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
}
