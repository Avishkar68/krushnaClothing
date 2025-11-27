import { Router } from "express";
import { addToCart, getCart, removeFromCart, clearCart } from "../controller/cartController.js";

const router = Router();

router.post("/add", addToCart);
router.get("/:mobile", getCart);
router.delete("/remove", removeFromCart);
router.delete("/clear/:mobile", clearCart);

export default router;
