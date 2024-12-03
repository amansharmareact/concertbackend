const Order = require('../../model/orderModel'); // Adjust path as necessary
const User = require('../../model/userModel'); // Adjust path as necessary

// Create a new order
exports.createOrder = async (req, res) => {
    try {
      const { fromLocation, toLocation, estimatedArrival, status, items, totalAmount, orderDetails } = req.body;
  
      const userId = req.user.id; // Assuming `req.user` contains the authenticated user info
  
      const orderId = `ORD-${Date.now()}`; // Generate a unique order ID
  
      const newOrder = new Order({
        orderId,
        userId,
        fromLocation,
        toLocation,
        estimatedArrival,
        status,
        items,
        totalAmount,
        orderDetails,
      });
  
      const savedOrder = await newOrder.save();

      await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            orderHistory: {
              orderId: newOrder._id,
              date: newOrder.createdAt,
              amount: newOrder.totalAmount,
              status: newOrder.status,
            },
          },
        },
        { new: true }
      );
      res.status(201).json({ message: "Order created successfully", order: savedOrder });
    } catch (error) {
      res.status(500).json({ message: "Error creating order", error: error.message });
    }
  };
  
// Get orders by ID
exports.getOrderById = async (req, res) => {
    try {
      const userId = req.user.id;
      const orderId = req.params.id;
  
      const order = await Order.findOne({ _id: orderId, userId });
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json({ message: "Order fetched successfully", order });
    } catch (error) {
      res.status(500).json({ message: "Error fetching order", error: error.message });
    }
  };

// Get user Orders
exports.getUserOrders = async (req, res) => {
    try {
      const userId = req.user.id; // Assuming `req.user` contains the authenticated user info
  
      const orders = await Order.find({ userId }).populate('items.productId', 'name price'); // Populate product details if needed
  
      if (!orders.length) {
        return res.status(404).json({ message: "No orders found for this user" });
      }
  
      res.status(200).json({ message: "Orders fetched successfully", orders });
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
  };
// Update an order
exports.updateOrder = async (req, res) => {
    try {
      const userId = req.user.id;
      const orderId = req.params.id;
  
      const order = await Order.findOneAndUpdate(
        { _id: orderId, userId },
        req.body,
        { new: true }
      );
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json({ message: "Order updated successfully", order });
    } catch (error) {
      res.status(500).json({ message: "Error updating order", error: error.message });
    }
  };
// Delete an order
exports.deleteOrder = async (req, res) => {
    try {
      const userId = req.user.id;
      const orderId = req.params.id;
  
      const deletedOrder = await Order.findOneAndDelete({ _id: orderId, userId });
  
      if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json({ message: "Order deleted successfully", order: deletedOrder });
    } catch (error) {
      res.status(500).json({ message: "Error deleting order", error: error.message });
    }
  };


  exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().populate('items.productId', 'name price'); // Adjust population as needed
  
      if (!orders.length) {
        return res.status(404).json({ message: "No orders found" });
      }
  
      res.status(200).json({ message: "All orders fetched successfully", orders });
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
  };