import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import {
  createProduct,
  getAllCategories,
  getAllProducts,
  getProductsByCategory,
  getSingleProduct,
  RegisterUser,
} from "../controllers/product.controller.js";
import User from "../models/user.model.js";

dotenv.config();
const router = express.Router();

router.get("/home", (req, res) => {
  res.send("Server is Ready");
});
router.get("/", getAllProducts);
router.get("/categories/:category/:id", getSingleProduct);
router.get("/categories/:category", getProductsByCategory);
router.get("/categories", getAllCategories);
router.get("/dashboard", async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Invalid or expired token" });
  }
});
router.post("/", createProduct);
router.post("/signup", RegisterUser);
router.post("/login", async (req, res) => {
  const { username, passwordHash } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );
    const isValid = await bcrypt.compare(passwordHash, user.passwordHash);
    if (isValid) {
      const { passwordHash, ...userWithoutPassword } = user.toObject();
    }
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      })
      .status(200)
      .json({
        success: true,
        message: "Login Successfull",
        user: userWithoutPassword,
      });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ success: false, message: "Bad Request" });
  }
});
router.post("/logout", async (req, res) => {
  res.clearCookie("access_token").json({
    message: "Logout Successfully",
  });
});

export default router;
