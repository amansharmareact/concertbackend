const Product = require("../../model/productModel");
const error = require("../../utils/error");
const Category = require("../../model/categoryModel");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, category, price, discount, stock, sku, images } = req.body;

    // Convert category from name to ObjectId
    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      return res.status(400).json({ message: "Invalid category" });
    }
    
    const categoryId = categoryDoc._id;

    // Calculate finalPrice
    const finalPrice = price - (discount.isPercentage ? (price * discount.amount) / 100 : discount.amount);
    console.log(finalPrice)
    if (isNaN(finalPrice)) {
      return res.status(400).json({ message: "Invalid price or discount values" });
    }

    const product = new Product({ name, description, category: categoryId, price, discount, stock, sku, images, finalPrice });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(400).json({ message: "Error creating product", error: error.message });
  }
};



exports.deleteProduct = async (productId) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) throw new Error('Product not found');
    return deletedProduct;
  } catch (error) {
    throw new Error('Error deleting product: ' + error.message);
  }
};

exports.updateProduct = async (productId, updateData) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
    if (!updatedProduct) throw new Error('Product not found');
    return updatedProduct;
  } catch (error) {
    throw new Error('Error updating product: ' + error.message);
  }
};

exports.getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId).populate('category').populate('reviews.userId');
    if (!product) throw new Error('Product not found');
    return product;
  } catch (error) {
    throw new Error('Error fetching product: ' + error.message);
  }
};

exports.getProducts = async (filter = {}, sort = {}, page = 1, limit = 10) => {
  try {
    const products = await Product.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('category');
    const totalCount = await Product.countDocuments(filter);
    return {
      products,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  } catch (error) {
    throw new Error('Error fetching products: ' + error.message);
  }
};