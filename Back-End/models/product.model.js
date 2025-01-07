import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    description: String,
    weight: Number,
    returnPolicy: String,
    shippingInformation: String,
    stock: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        rating: Number,
        comment: String,
        reviewerName: String,
        reviewerEmail: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

export default Product;
