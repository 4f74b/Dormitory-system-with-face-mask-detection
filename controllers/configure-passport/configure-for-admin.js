const passport = require("passport");
const localStrategy = require("passport-local");
const Warden = require("../../data-models/warden");
module.exports = function (req, res, next) {
  passport.use("warden", new localStrategy(Warden.authenticate()));

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    if (user != null) done(null, user);
  });

  next();
};
