const isLoggedIn = function (req, res, next) {
  if (!req.user) {
    req.flash("error", "You must log in first.");
    res.redirect("/dormitory/staff/login");
  } else {
    next();
  }
};

module.exports = isLoggedIn;
