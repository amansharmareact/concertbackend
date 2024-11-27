const express=require("express")
const router=express.Router();
const userAuthController = require("../controller/user/authController");
const message=require("../middleware/validationError")
const validation=require("../validation/userValidation");
const VERIFY_USER=require("../middleware/authMiddleware")
const uploadController = require("../controller/user/uploadController");


router.post("/signup",validation.SignupValidate , userAuthController.signUp)
router.post("/otpVerify", userAuthController.otpVerification)
router.post("/login", userAuthController.login)
module.exports=router; 