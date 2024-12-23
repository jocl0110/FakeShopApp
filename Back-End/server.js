import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(process.env.PORT, () => {
  connectToDB();
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});
