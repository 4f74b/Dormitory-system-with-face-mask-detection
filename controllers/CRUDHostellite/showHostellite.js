const Hostellite = require("../../data-models/student");
const ExpressError = require("../../utils/ExpressError");

const showHostellite = async function (req, res, next) {
  const hostelliteInfo = await Hostellite.findOne({ username: req.params.username });
  if (hostelliteInfo) {
    res.render("student/profile", { hostelliteInfo });
  } else {
    res.render("error", { err: new ExpressError(400, "Page not found") });
  }
};

module.exports = showHostellite;
