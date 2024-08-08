const Campground = require("../Models/Campground");

module.exports.RenderNewCampgroundPage = (req, res) => {
  console.log("checking user", req.user);
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  res.render("Campgrounds/new");
};

module.exports.CreateAndPostCampground = async (req, res, next) => {
  if (!req.body.campground) {
    throw new ExpressError("Invalid Campground Data", 400);
  }
  const camp = new Campground(req.body.campground);
  camp.author = req.user._id;
  await camp.save();
  req.flash("sucess", "Sucessfully Created Campground");

  res.redirect(`/campgrounds/${camp._id}`);
};

module.exports.OpenCampgorundForEdit = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  const campground = await Campground.findById(req.params.id);
  if (!campground.author._id.equals(req.user._id)) {
    res.redirect("/campgrounds");
  }
  res.render("Campgrounds/edit", { campground });
};

module.exports.UpdateExistingCampground = async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(req.params.id);
  console.log(id);
  console.log(camp);

  if (!camp.author._id.equals(req.user._id)) {
    throw new ExpressError("You do not have permission to do that", 400);
  }

  const campground = await Campground.findByIdAndUpdate(camp._id, {
    ...req.body.campground,
  });
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.ShowAllCampgrounds = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("Campgrounds/index", { campgrounds });
};

module.exports.DeleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
};

module.exports.OpenCampgroundDetails = async (req, res) => {
  const campground = await Campground.findById(req.params.id.trim())
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("author");

  res.render("Campgrounds/show", { campground });
};
