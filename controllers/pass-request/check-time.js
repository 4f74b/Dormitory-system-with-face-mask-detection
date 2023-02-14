module.exports = async function (req, res, next) {
  if (new Date().getHours() < 22) {
    next();
  } else {
    req.flash("error", "You Cannot Send Pass Request After 10:00 pm");
    res.redirect("/dormitory/student/pass-request-status");
  }
};
