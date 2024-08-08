const express = require("express");
const router = express.Router();
const Campground = require("../Models/Campground");
const ExpressError = require("../Utilities/ExpressError"); // Correct name
const catchAsync = require("../Utilities/CatchAsync");
const joi = require("joi");
const Review = require("../Models/ReviewsModel");
const flash = require("connect-flash");
const CampController = require("../Controllers/Campground");

router.get("/new", (req, res) => {
  CampController.RenderNewCampgroundPage(req, res);
});

const validateCampground = (req, res, next) => {
  const campgroundSchema = joi.object({
    campground: joi
      .object({
        title: joi.string().required(),
        price: joi.number().required().min(0),
        description: joi.string().required(),
        location: joi.string().required(),
        image: joi.string().uri().required(),
      })
      .required(),
  });
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 404);
  } else next();
};

router.post(
  "/",
  validateCampground,
  catchAsync(CampController.CreateAndPostCampground)
);

router.put(
  "/:id",
  validateCampground,
  catchAsync(CampController.UpdateExistingCampground)
);

router.get("/", catchAsync(CampController.ShowAllCampgrounds));

router.get("/:id/edit", catchAsync(CampController.OpenCampgorundForEdit));

router.delete("/:id", catchAsync(CampController.DeleteCampground));

router.get("/:id", catchAsync(CampController.OpenCampgroundDetails));
module.exports = router;
