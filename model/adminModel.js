const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

adminSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject._id;
    delete returnObject.__v;
    delete returnObject.password;
  },
});
module.exports = mongoose.model("admin", adminSchema);
