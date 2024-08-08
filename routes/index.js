var express = require("express");
var router = express.Router();
const ExpressError = require("../Utilities/ExpressError");
const campgrounds = require("./Campground");
const reviews = require("./Reviews");
const flash = require("connect-flash");
const userRoutes = require("./users");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("home", { title: "Express" });
// });

router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

router.use("/", userRoutes);
router.use("/campgrounds", campgrounds); // Mount campgrounds router
router.use("/campgrounds/:id/reviews", reviews); // Mount reviews router under campgrounds
// const sessionsecret = {
//   secret: "hehehe",
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//     maxage: 24,
//   },
// };
router.use(flash());

// Catch-all for invalid routes
router.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// Custom error handler
router.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) {
    err.message = "Oh No SomeThing Went Wrong";
  }
  res.status(statusCode).render("error", { err });
});

module.exports = router;
