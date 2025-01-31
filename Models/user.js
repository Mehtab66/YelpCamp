const mongoose = require("mongoose");
// const passport = require("passport");
// const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
