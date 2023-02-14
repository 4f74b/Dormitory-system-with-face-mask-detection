const Student = require("../../data-models/student");
const ExpressError = require("../../utils/ExpressError");

module.exports = async function (req, res, next) {
  if (req.user.username == req.params.username || req.user.role == "warden" || req.user.role == "staff") {
    next();
  } else {
    res.render("error", { err: new ExpressError(404, "Page not found") });
  }
};
