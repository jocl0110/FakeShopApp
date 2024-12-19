import Product from "../models/product.model.js";

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
