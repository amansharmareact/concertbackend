require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DEV_DB_URL)
  .then(() => console.log("Database Connected✌️"))
  .catch((err) => console.log(err));
