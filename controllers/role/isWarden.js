const Warden = require("../../data-models/warden");

module.exports = async (req, res, next) => {
  if (req.user) {
    const warden = await Warden.findOne({ username: req.user.username });
    if (warden) {
      next();
    } else {
      req.flash("error", "You do no have permission to enter this route");
      res.redirect("/dormitory/student/" + req.user.username);
    }
  } else {
    next();
  }
};
