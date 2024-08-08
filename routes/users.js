const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const catchAsync = require("../Utilities/CatchAsync");
const passport = require("passport");
const UserController = require("../Controllers/User");
// GET /register - Render registration form
router.get("/register", UserController.OpenFormForRegisterForAccount);

router.post("/register", catchAsync(UserController.RegisteringForNewAccount));

router.get("/login", UserController.LoginFormPage);

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlashL: true,
    failureRedirect: "./login",
  }),
  UserController.LoggingIn
);

router.get("/logout", UserController.Logout);

module.exports = router;
