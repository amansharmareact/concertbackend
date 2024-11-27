const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin/authController");
const message = require("../middleware/validationError");
const adminValidation = require("../validation/adminValidation");
const { verifyAdmin } = require("../middleware/authMiddleware");

//auth management
router.post(
  "/adminLogin",
  adminValidation.adminLoginValidate,
  message.errorResponse,
  adminController.adminLogin
);
router.post("/adminLogout", verifyAdmin, adminController.adminLogout);
router.post("/adminSignUp", adminController.adminSignUp);