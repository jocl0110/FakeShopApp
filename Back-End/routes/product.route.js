import express from "express";

import {
  createProduct,
  getAllCategories,
  getAllProducts,
  getProductsByCategory,
  getSingleProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/home", (req, res) => {
  res.send("Server is Ready");
});
router.get("/", getAllProducts);
router.get("/categories/:category/:id", getSingleProduct);
router.get("/categories/:category", getProductsByCategory);
router.get("/categories", getAllCategories);
router.post("/", createProduct);

export default router;
