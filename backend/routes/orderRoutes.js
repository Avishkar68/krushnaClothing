import { Router } from "express";
import { placeOrder, getUserOrders ,generateInvoicePDF } from "../controller/orderController.js";

const router = Router();

router.post("/place", placeOrder);
router.get("/:mobile", getUserOrders);
router.get("/invoice/:id", generateInvoicePDF);

export default router;
