const User = require("../Models/user");
const passport = require("passport");

module.exports.OpenFormForRegisterForAccount = (req, res) => {
  res.render("Users/Register");
};

module.exports.RegisteringForNewAccount = async (req, res, next) => {
  const { email, username, password } = req.body;
  const user = new User({ email, username });

  try {
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Registration successful!"); // Setting flash message
      res.redirect("/campgrounds");
    });
  } catch (err) {
    req.flash("error", "Failed to register. Please try again."); // Setting error flash message
    res.redirect("/register"); // Redirect back to registration form on error
  }
};

module.exports.LoginFormPage = (req, res) => {
  res.render("Users/LoginPage");
};

module.exports.LoggingIn = (req, res) => {
  req.flash("success", "Registration successful!");

  res.redirect("/campgrounds");
};

module.exports.Logout = (req, res, next) => {
  req.logout(function (error) {
    if (error) {
      return next(error); // Pass error to the next error-handling middleware
    }
    res.redirect("/login");
  });
};
