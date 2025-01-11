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

const handleError = (res, status, message) => {
  return res.status(status).json({ success: false, message });
};

// Home Route
router.get("/home", (req, res) => {
  res.send("Server is Ready");
});

// Product Routes
router.get("/", getAllProducts);
router.get("/categories/:category/:id", getSingleProduct);
router.get("/categories/:category", getProductsByCategory);
router.get("/categories", getAllCategories);

// Dashboard Route - Check for valid token and retrieve user info
router.get("/dashboard", async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).json({ success: false, message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        role: user.role,
        id: user._id,
      },
    });
  } catch (error) {
    console.error(error);
    return handleError(res, 500, "Invalid or expired token");
  }
});
// Create a Product Route
router.post("/", createProduct);

// User SignUp Route
router.post("/signup", RegisterUser);
// User Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );
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
        user: {
          username: user.username,
          id: user._id,
        },
      });
  } catch (error) {
    console.log("Error during login: ", error.message);
    return handleError(
      res,
      500,
      "Something went wrong. Please try again later"
    );
  }
});
router.post("/logout", async (req, res) => {
  res
    .clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .status(200)
    .json({
      success: true,
      message: "Logout successful",
    });
});

export default router;
