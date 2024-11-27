const { body, check, query, param } = require('express-validator');

const adminLoginValidate = [
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
  check("password").notEmpty().withMessage("password is required"),
];

const quizValidate = [
    check('question').notEmpty().withMessage("question is required"),
    check('options').notEmpty().withMessage("options is required"),
    check('correctAnswer').notEmpty().withMessage("correctAnswer is required"),
];

const assessmentValidate = [
    check('question').notEmpty().withMessage("question is required"),
    check('answer').notEmpty().withMessage("answer is required"),
];


const moduleValidate=[
    check('topicName').notEmpty().withMessage("topicName is required"),
    check('videos').notEmpty().withMessage("videos is required"),
];

const featureValidate = [
  check("title").notEmpty().withMessage("title is required"),
  check("image").notEmpty().withMessage("image is required"),
  check("description").notEmpty().withMessage("description is required"),
];

const testimonialValidate = [
  check("name").notEmpty().withMessage("name is required"),
  check("image").notEmpty().withMessage("image is required"),
  check("review").notEmpty().withMessage("review is required"),
];

const bannerValidate = [
  check("image").notEmpty().withMessage("image is required"),
  check("description").notEmpty().withMessage("description is required"),
];

const createWebPage = [
  check("pageName").notEmpty().withMessage("Page Name is required"),
  check("html").notEmpty().withMessage("description is required"),
];
const createFaqValidate = [
  check("question").notEmpty().withMessage("question is required"),
  check("answer").notEmpty().withMessage("answer is required"),
];
const createInstructorValidate = [
  check("image").notEmpty().withMessage("image is required"),
  check("name").notEmpty().withMessage("name is required"),
  check("about").notEmpty().withMessage("about is required"),
  check("qualification").notEmpty().withMessage("qualification is required"),
  check("experience").notEmpty().withMessage("experience is required"),
  check("linkdinUrl").notEmpty().withMessage("linkdinUrl is required"),
  check("instructorRating").notEmpty().withMessage("instructorRating is required"),
];
  
module.exports = {
  adminLoginValidate,
  quizValidate,
  assessmentValidate,
  moduleValidate,
  featureValidate,
  testimonialValidate,
  bannerValidate,
  createWebPage,
  createFaqValidate,
  createInstructorValidate,
};