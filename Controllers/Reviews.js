const Review = require("../Models/ReviewsModel");
const Campground = require("../Models/Campground");

module.exports.postAreview = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  const campgroundId = req.params.id;
  console.log("Campground ID:", campgroundId); // Debugging statement

  const campground = await Campground.findById(campgroundId);
  console.log("Campground Found:", campground); // Debugging statement

  if (!campground) {
    throw new ExpressError("Campground not found", 404);
  }
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.DeleteAReview = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  const { id, reviewId } = req.params;
  console.log("Campground ID:", id); // Debugging statement

  const campground = await Campground.findById(id);
  console.log("Campground Found:", campground); // Debugging statement

  if (!campground) {
    throw new ExpressError("Campground not found", 404);
  }
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/campgrounds/${id}`);
};
