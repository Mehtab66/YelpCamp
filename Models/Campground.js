const mongoose = require("mongoose");
const Review = require("./ReviewsModel");
const CampgroundSchema = mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  location: String,
  image: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});
CampgroundSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
  console.log(doc);
});

module.exports = mongoose.model("Campground", CampgroundSchema);
