const isLoggedIn = function (req, res, next) {
  if (!req.user) {
    req.flash("error", "You must log in first.");
    res.redirect("/dormitory/admin/login");
  } else {
    next();
  }
};

module.exports = isLoggedIn;
