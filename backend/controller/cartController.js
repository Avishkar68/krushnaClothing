import Cart from "../models/Cart.js";

export async function addToCart(req, res) {
  try {
    const { mobile, item } = req.body;
    let cart = await Cart.findOne({ mobile });
    if (!cart) cart = new Cart({ mobile, items: [] });
    cart.items.push(item);
    await cart.save();
    res.json(cart);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
}

export async function getCart(req, res) {
  try {
    const cart = await Cart.findOne({ mobile: req.params.mobile });
    res.json(cart);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
}

export async function removeFromCart(req, res) {
  try {
    const { mobile, productId } = req.body;
    let cart = await Cart.findOne({ mobile });
    cart.items = cart.items.filter(i => i.productId !== productId);
    await cart.save();
    res.json(cart);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
}

export async function clearCart(req, res) {
  try {
    await Cart.deleteOne({ mobile: req.params.mobile });
    res.json({ message: "Cart cleared" });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
}
