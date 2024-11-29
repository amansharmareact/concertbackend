const Product = require("../../model/productModel");
const error = require("../../utils/error");
const Category = require("../../model/categoryModel");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, category, price, discount, stock, images } = req.body;

    // Convert category from name to ObjectId
    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return res.status(400).json({ message: "Invalid category" });
    }
    
    const categoryId = categoryDoc._id.toString();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    const sku = `${name.substring(0, 3).toUpperCase()}-${categoryDoc.name.substring(0, 3).toUpperCase()}-${randomSuffix}`;
    // Calculate finalPrice
    const finalPrice = price - (discount.isPercentage ? (price * discount.amount) / 100 : discount.amount);
    if (isNaN(finalPrice)) {
      return res.status(400).json({ message: "Invalid price or discount values" });
    }

    const product = new Product({ name, description, category: categoryId, price, discount, stock, sku, images, finalPrice });
    console.log(product)
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(400).json({ message: "Error creating product", error: error.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
   
    const deletedProduct = await Product.deleteOne({ _id: req.params.id });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found", status: 404 });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
      status: 200,
      data: deletedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting product: " + error.message,
      status: 500,
    });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const arrayOfEditKeys = ["name", "description", "category", "price", "discount", "stock", "images"];
    const objectUpdate = {};
    for (const key of arrayOfEditKeys) {
      if (req.body[key] != null) {
        objectUpdate[key] = req.body[key];
      }
    }
    const update = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      objectUpdate,
      { new: true }
    );
    console.log('sss',update)
    if (update) {
      return res.status(error.status.OK).send({
        message: "Product Updated Successfully.",
        status: error.status.OK,
        data: update,
      });
    }
  } catch (e) {
    return res.status(error.status.InternalServerError).json({
      message: e.message,
      status: error.status.InternalServerError,
    });
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


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");

    if (products.length === 0) {
      return res.status(404).send({
        message: "Products not found",
        status: 404,
      });
    }

    return res.status(200).send({
      message: "Success",
      status: 200,
      data: products,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message || "Internal Server Error",
      status: 500,
    });
  }
};