const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },

  price: { type: Number, required: true },
  discount: {
    isPercentage: { type: Number, default: false },
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

  tags: [{ type: String }], 
  color:[{ type: String }],
  size:[{ type: String }],
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,  
});

module.exports = mongoose.model("Product", ProductSchema);

