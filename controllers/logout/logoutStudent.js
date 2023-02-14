module.exports = function (req, res) {
  req.logout(() => {
    req.flash("success", "Logged out");
    res.redirect("/dormitory/student/login");
  });
};
