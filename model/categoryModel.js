const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true, 
      trim: true,
      unique: true
    },
    description: { 
      type: String, 
      trim: true 
    },
    catimage: { type: String, required: true },
  }, {
    timestamps: true
  });

module.exports = mongoose.model("Category", CategorySchema);
