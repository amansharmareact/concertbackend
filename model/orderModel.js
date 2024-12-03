const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  fromLocation: { type: String, required: true },
  toLocation: { type: String, required: true },
  estimatedArrival: { type: Date },
  status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered'], default: 'Pending' },
  items: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
  totalAmount: { type: Number, required: true },
  orderDetails: { type: String },
}, { timestamps: true });


module.exports = mongoose.model("Order", orderSchema);
