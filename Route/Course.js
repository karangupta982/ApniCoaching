const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../Controller/Course");

const {
  categories,
  createCategory,
  categoryPageDetails,
} = require("../Controller/Category");

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../Controller/Section");

const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../Controller/SubSection");

const {
  createRating,
  getAverageRating,
  getAllRatingReview,
  createReview,
  getAllUserReviews,
} = require("../Controller/RatingandReview");
const {
  updateCourseProgress,
  getProgressPercentage,
} = require("../Controller/CourseProgress");

const { 
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../Middleware/Auth");

router.post("/createCourse", auth, isInstructor, createCourse);

router.post("/editCourse", auth, isInstructor, editCourse);

router.post("/addSection", auth, isInstructor, createSection);

router.post("/updateSection", auth, isInstructor, updateSection);

router.post("/deleteSection", auth, isInstructor, deleteSection);

router.post("/updateSubSection", auth, isInstructor, updateSubSection);

router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

router.post("/addSubSection", auth, isInstructor, createSubSection);

router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);

router.get("/getAllCourses", getAllCourses);

router.post("/getCourseDetails", getCourseDetails);

router.post("/getFullCourseDetails", auth, getFullCourseDetails);

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

router.delete("/deleteCourse", deleteCourse);

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/categories", categories);
router.post("/getCategoryPageDetails", categoryPageDetails);

router.post("/createRating", auth, isStudent, createRating);
router.post("/createReview", auth, isStudent, createReview);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRatingReview);
router.get("/getallUserReviews", getAllUserReviews);

module.exports = router;
