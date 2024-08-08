const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("../Models/Campground");
const Review = require("../Models/ReviewsModel");
const ExpressError = require("../Utilities/ExpressError");
const catchAsync = require("../Utilities/CatchAsync");
const joi = require("joi");
const ReviewController = require("../Controllers/Reviews");

const ValidateReview = (req, res, next) => {
  const reviewSchema = joi.object({
    review: joi
      .object({
        rating: joi.number().required().min(1).max(5),
        body: joi.string().required(),
      })
      .required(),
  });
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else next();
};

router.post("/", ValidateReview, catchAsync(ReviewController.postAreview));

router.delete("/:reviewId", catchAsync(ReviewController.DeleteAReview));

module.exports = router;
