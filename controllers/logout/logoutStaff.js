module.exports = function (req, res) {
  req.logout(() => {
    req.flash("success", "Logged out");
    console.log("helllo");
    res.redirect("/dormitory/staff/login");
  });
};
