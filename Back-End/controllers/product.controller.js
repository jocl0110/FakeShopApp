import Product from "../models/product.model.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { validateUser } from "../models/user.model.js";
import NodeMailer from "nodemailer";

//!  GET METHODS
export const getAllProducts = async (req, res) => {
  const { search } = req.query;
  try {
    if (search) {
      const filteredProducts = await Product.find({
        name: { $regex: search, $options: "i" },
      });
      res.status(200).json({ success: true, data: filteredProducts });
    } else {
      const products = await Product.find({});
      res.status(201).json({ success: true, data: products });
    }
  } catch (error) {
    console.log(`Error ${error}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.log(`Error ${error}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const decodedCategory = category.replace(/-/g, " ");
    const productsByCategory = await Product.find({
      category: { $regex: decodedCategory, $options: "i" },
    });
    res.status(201).json({ success: true, data: productsByCategory });
  } catch (error) {
    console.log(`Error ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    if (!categories || categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories found",
      });
    }

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.log(`Error ${error.message}`);
    res.status(500).json({ success: true, message: "Server Error" });
  }
};
// ! POST METHODS
export const createProduct = async (req, res) => {
  const product = req.body;
  if (
    !product.name ||
    !product.image ||
    !product.price ||
    !product.category ||
    !product.rating ||
    !product.stock
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log(`Error in creating a product: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const RegisterUser = async (req, res) => {
  try {
    const result = validateUser(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ success: false, message: result.errors.join(", ") });
    }
    const { firstName, lastName, username, email, password, adminCode } =
      req.body;
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT)
    );
    let role = undefined;
    if (adminCode && adminCode === process.env.ADMIN_CODE) {
      role = "admin";
    }
    const transpoter = NodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const htmlContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to FakeStoreApp</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 10px;
                padding: 20px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
                font-size: 24px;
            }
            p {
                color: #555;
                font-size: 16px;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Hello ${firstName},</h1>
            <p>Thank you for subscribing to **FakeStoreApp**!</p>
            <p>Your account has been successfully created. We are thrilled to have you on board. Here are some things you can expect:</p>
            <ul>
                <li>Explore our collection of products at unbeatable prices.</li>
                <li>Track your order history easily.</li>
                <li>Enjoy exclusive discounts and offers for registered users.</li>
            </ul>
            <p>To get started, click the button below to visit your profile:</p>
            <a href="https://www.fakestoreapp.com/profile" class="button">Visit Profile</a>
            <p>If you have any questions or need help, feel free to reach out to us at <a href="mailto:support@fakestoreapp.com">support@fakestoreapp.com</a>.</p>
            <p>Best regards,</p>
            <p>The FakeStoreApp Team</p>
        </div>
    </body>
    </html>
  `;
    const info = await transpoter.sendMail({
      from: "FakeStoreApp Managment <joseluisizquierdoshernandez@gmail.com",
      to: email,
      subject: "Thanks for choosing FakeStore APP",
      html: htmlContent,
    });
    console.log(`Message Sent, ${info.messageId}`);
    await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({
      success: true,
      message: "Signed up successfully",
    });
  } catch (error) {
    console.log(`Error registering user:  ${error}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
