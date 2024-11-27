const express=require("express")
const router=express.Router();
const userAuthController = require("../controller/user/authController");
const userCourseController=require("../controller/user/courseController")
const courseController = require('../controller/admin/courseController');
const webController = require("../controller/admin/webController");
const instructorController = require("../controller/admin/instructorController");
const message=require("../middleware/validationError")
const validation=require("../validation/userValidation");
const VERIFY_USER=require("../middleware/authMiddleware")
const featureController = require("../controller/admin/featuresController");
const uploadController = require("../controller/user/uploadController");



module.exports=router; 