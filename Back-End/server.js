import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productRoutes);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(process.env.PORT, () => {
  try {
    connectToDB();
    console.log(`Server started at http://localhost:${process.env.PORT}`);
  } catch (error) {
    console.error("Database connection failed");
    process.exit(1);
  }
});

process.on("SIGINT", () => {
  console.log("\nGracefully shutting down...");
  process.exit(0);
});
