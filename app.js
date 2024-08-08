console.log(process.env.SECRET);
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("./Models/user");
const localStrategy = require("passport-local");
const methodOverride = require("method-override");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const createError = require("http-errors");
const ejsmate = require("ejs-mate");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();
const myname = "my name is muhammad mehtab ahmed";
const age = 20;
const email = "mehtab ahmed 7777777@gmail.com";
// MongoDB connection setup
mongoose
  .connect("mongodb://127.0.0.1:27017/YELPCAMP", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection error: ", err));
const op = "opopopoop";
// Session configuration
const sessionConfig = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionConfig));
app.use(flash()); // Ensure flash middleware is used after session

// Other middleware and configurations
app.engine("ejs", ejsmate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use("/users", usersRouter);
app.use("/", indexRouter);

// Error handling
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

module.exports = app;
