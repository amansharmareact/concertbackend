const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin/authController");
const productController = require("../controller/admin/productController");
const categoryController = require("../controller/admin/categoryController");
const message = require("../middleware/validationError");
const adminValidation = require("../validation/adminValidation");
const { verifyAdmin } = require("../middleware/authMiddleware");
const userController = require("../controller/admin/userController");

//auth management
router.post(
  "/adminLogin",
  adminValidation.adminLoginValidate,
  message.errorResponse,
  adminController.adminLogin
);
router.post("/adminLogout", verifyAdmin, adminController.adminLogout);
router.post("/adminSignUp", adminController.adminSignUp);

//user CRUD
router.get("/getAllUser", verifyAdmin, userController.getAllUsers);
router.delete("/deleteUser", verifyAdmin, userController.deleteUser);

//product CRUD
router.post("/addProduct", verifyAdmin, productController.createProduct)
router.put("/editProduct/:id", verifyAdmin, productController.updateProduct)
// router.get("/getProduct/:id", verifyAdmin, productController.getProductById)
router.get("/getProduct", verifyAdmin, productController.getProducts)
router.delete("/deleteProduct/:id", verifyAdmin, productController.deleteProduct)


//category CRUD
router.post("/addCategory", verifyAdmin, categoryController.createCategory)
router.put("/editCategory/:id", verifyAdmin, categoryController.editCategory)
// router.get("/getCategory/:id", verifyAdmin, categoryController.getAllCategory)
router.get("/getCategory", verifyAdmin, categoryController.getAllCategory)
router.delete("/deleteCategory/:id", verifyAdmin, categoryController.deleteCategory)

module.exports = router;
