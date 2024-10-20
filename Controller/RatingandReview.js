const RatingAndReview = require("../Model/RatingAndReview");
const Course = require("../Model/Course");
const mongoose = require("mongoose");
const User = require("../Model/User")


exports.createRating = async (req, res) => {
  try {
    // console.log("fetching details....")
    const userId = req.user.id;
    const { rating, review, courseId } = req.body;
    // console.log("User Details Fetched",userId,review,rating)
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnroled: { $elemMatch: { $eq: userId } },
    });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in this course",
      });
    }

    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course already reviewed by user",
      });
    }

    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    await Course.findByIdAndUpdate(courseId, {
      $push: {
        ratingAndReviews: ratingReview,
      },
    });
    await courseDetails.save();

    return res.status(201).json({
      success: true,
      message: "Rating and review created successfully",
      ratingReview,
    });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



exports.createReview = async (req, res) => {
  try {
    // console.log("fetching details....")
    const userId = req.user.id;
    const { rating, review } = req.body;
    // console.log("User  Details Fetched", userId, review, rating)
    

    if (!userId || !rating || !review) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }

    const user = await User.findByIdAndUpdate(userId, {
      $push: {
        reviews: review,
        ratings: rating,
      },
    }, { new: true });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User  not found",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Rating and review added successfully",
      review,
    });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


exports.getAverageRating = async (req, res) => {
  try {
    const courseId = req.body.courseId;

    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    return res.status(200).json({ success: true, averageRating: 0 });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating for the course",
      error: error.message,
    });
  }
};

exports.getAllRatingReview = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    res.status(200).json({
      success: true,
      data: allReviews,
    });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating and review for the course",
      error: error.message,
    });
  }
};



// exports.getAllUserReviews = async (req, res) => {
//   try {
//     const allUsers = await User.find({}).select('ratings reviews -_id');

//     const allRatings = allUsers.map(user => user.ratings);
//     const allReviews = allUsers.map(user => user.reviews);
    


//     res.status(200).json({
//       success: true,
//       ratings: allRatings,
//       reviews: allReviews,
//     });
//   } catch (error) {
    // console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to retrieve the ratings and reviews from all users",
//       error: error.message,
//     });
//   }
// };




exports.getAllUserReviews = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $project: {
          _id: 0,
          firstName: 1,
          lastName: 1,
          email: 1,
          image: 1,
          ratings: 1,
          reviews: 1,
          ratingAndReview: {
            $zip: { inputs: ["$ratings", "$reviews"] }
          }
        }
      },
      {
        $unwind: "$ratingAndReview"
      },
      {
        $project: {
          _id: 0,
          firstName: 1,
          lastName: 1,
          email: 1,
          image: 1,
          rating: { $arrayElemAt: ["$ratingAndReview", 0] },
          review: { $arrayElemAt: ["$ratingAndReview", 1] }
        }
      }
    ]);

    const userData = result.map(user => ({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      rating: user.rating,
      review: user.review
    }));

    res.status(200).json({
      success: true,
      data: userData
    });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the ratings and reviews from all users",
      error: error.message
    });
  }
};