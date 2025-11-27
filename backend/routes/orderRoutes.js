import { Router } from "express";
import { placeOrder, getUserOrders } from "../controller/orderController.js";

const router = Router();

router.post("/place", placeOrder);
router.get("/:mobile", getUserOrders);

export default router;
