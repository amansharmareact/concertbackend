const { body,check,query, param,header} = require('express-validator');

const SignupValidate = [
  check("name").notEmpty().withMessage("Name is required"),
  check("phone").notEmpty().withMessage("Phone Number is required"),
  check("email").notEmpty().withMessage("Email is required"),
  check("email")
    .notEmpty()
    .isEmail()
    .withMessage("Invalid email format")
    .custom((value) => {
      if (!value.includes("@")) {
        throw new Error('Email must contain "@" symbol');
      }
      return true;
    }),
];

const LoginValidate = [
    check('email').notEmpty().withMessage("Email is required"),
    check('email').notEmpty().isEmail().withMessage('Invalid email format').custom(value => {
        if (!value.includes('@')) {
            throw new Error('Email must contain "@" symbol');
        }
        return true;
    }),
    check('password').notEmpty().withMessage("Password is required"),
];


const forgotPasswordValidate=[
    check('email').notEmpty().withMessage("Email is required"),
    check('email').notEmpty().isEmail().withMessage('Invalid email format').custom(value => {
        if (!value.includes('@')) {
            throw new Error('Email must contain "@" symbol');
        }
        return true;
    }),
];
const setNewPasswordValidate = [
    check('newPassword').notEmpty().withMessage("New Password is required"),
];

const OtpValidate = [
    check('otp').notEmpty().withMessage("otp is required"),
    check('email').notEmpty().withMessage("Email is required"),
];
const contactValidate = [
    check('name').notEmpty().withMessage("Name is required"),
    check('email').notEmpty().withMessage("Email is required"),
    check('email').notEmpty().isEmail().withMessage('Invalid email format').custom(value => {
        if (!value.includes('@')) {
            throw new Error('Email must contain "@" symbol');
        }
        return true;
    }),
    check('subject').notEmpty().withMessage("Subject is required"),
    check('message').notEmpty().withMessage("Message is required"),

];

const createOrderValidate = [
    check('courseId')
      .notEmpty().withMessage('Course ID is required')
      .isMongoId().withMessage('Invalid Course ID format'),
  ];
  
  const verifyPaymentValidate = [
    body('orderId')
      .notEmpty().withMessage('Order ID is required'),
    body('paymentId')
      .notEmpty().withMessage('Payment ID is required'),
    header('x-razorpay-signature')
      .notEmpty().withMessage('Razorpay signature is required'),
];
  
const profileValidate = [
  check("name").notEmpty().withMessage("Name is required"),
  check("countryCode").notEmpty().withMessage("Country code is required"),
  check("phone").notEmpty().withMessage("Phone number is required"),
];

const reviewRatingValidate = [
  check("courseId")
    .notEmpty()
    .withMessage("Course ID is required"),
  check("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),
  check("review").notEmpty().withMessage("Review is required"),
  check("linkedIn").notEmpty().withMessage("LinkedIn URL is required"),
  check("collegeName").notEmpty().withMessage("College Name is required"),
];
  
module.exports = {
  SignupValidate,
  LoginValidate,
  forgotPasswordValidate,
  setNewPasswordValidate,
  OtpValidate,
  contactValidate,
  createOrderValidate,
  verifyPaymentValidate,
  profileValidate,
  reviewRatingValidate,
};