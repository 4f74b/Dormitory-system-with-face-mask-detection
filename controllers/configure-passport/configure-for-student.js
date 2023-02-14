const passport = require("passport");
const localStrategy = require("passport-local");
const Student = require("../../data-models/student");
module.exports = function (req, res, next) {
  passport.use("student", new localStrategy(Student.authenticate()));
  // Serialize and deserialize a Student in and out of session

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    if (user != null) done(null, user);
  });
  next();
};
