const passport = require("passport");
const localStrategy = require("passport-local");
const Staff = require("../../data-models/staff");
module.exports = function (req, res, next) {
  passport.use("staff", new localStrategy(Staff.authenticate()));

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    if (user != null) done(null, user);
  });

  next();
};
