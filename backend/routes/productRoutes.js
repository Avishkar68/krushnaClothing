import { Router } from "express";
import { getAllProducts, getProductDetails } from "../controller/productController.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductDetails);

export default router;
