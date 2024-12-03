const express=require("express")
const router=express.Router();
const userAuthController = require("../controller/user/authController");
const message=require("../middleware/validationError")
const validation=require("../validation/userValidation");
const {verifyUserToken}=require("../middleware/authMiddleware")
const uploadController = require("../controller/user/uploadController");
const orderController = require("../controller/admin/orderController");


router.post("/signup",validation.SignupValidate , userAuthController.signUp)
router.post("/otpVerify", userAuthController.otpVerification)
router.post("/login", userAuthController.login)


router.post('/createOrder', verifyUserToken, orderController.createOrder);
router.get('/getAllOrder', verifyUserToken, orderController.getUserOrders);



module.exports=router; 