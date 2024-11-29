const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },

  price: { type: Number, required: true },
  discount: {
    amount: { type: Number, default: 0 },
    isPercentage: { type: Boolean, default: false },
  },
  finalPrice: { type: Number, required: true },  // Could be derived from price and discount
  
  stock: { type: Number, required: true },
  sku: { type: String, unique: true, required: true },  // Stock Keeping Unit, for inventory management
  
  images: [{ type: String, required: true }],  // URLs or paths to product images
  
  ratings: {
    average: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
  },
  
  reviews: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  }],

  tags: [{ type: String }],  // Tags for search and filter purposes

  specifications: { type: Map, of: String },  // A map for product specs, e.g., color, size, material
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,  // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model("Product", ProductSchema);

