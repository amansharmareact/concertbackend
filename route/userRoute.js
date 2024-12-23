const express=require("express")
const router=express.Router();
const userAuthController = require("../controller/user/authController");
const message=require("../middleware/validationError")
const validation=require("../validation/userValidation");
const {verifyUserToken}=require("../middleware/authMiddleware")
const uploadController = require("../controller/user/uploadController");
const orderController = require("../controller/admin/orderController");
const categoryController = require("../controller/admin/categoryController");
const productController = require("../controller/admin/productController");

router.post("/signup",validation.SignupValidate , userAuthController.signUp)
router.post("/otpVerify", userAuthController.otpVerification)
router.post("/login", userAuthController.login)


router.post('/createOrder', verifyUserToken, orderController.createOrder);
router.get('/getAllOrder', verifyUserToken, orderController.getUserOrders);
router.get('/getOrder/:id', verifyUserToken, orderController.getOrderById);

router.get("/getProduct", productController.getProducts)

router.get("/getCategory", categoryController.getAllCategory)

module.exports=router; 