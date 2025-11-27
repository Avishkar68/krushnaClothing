import { Router } from "express";
import multer from "multer";
import {
  getAllOrders,
  updateOrderStatus,
  addProduct,
  editProduct,
  deleteProduct,
} from "../controller/adminController.js";

// memory upload for Cloudinary
const upload = multer({ storage: multer.memoryStorage() });

const router = Router();
router.get("/orders", getAllOrders);
router.patch("/order/:id", updateOrderStatus);
router.post("/product", upload.array("images", 5), addProduct);
router.patch("/product/:id", editProduct);
router.delete("/product/:id", deleteProduct);
export default router;
