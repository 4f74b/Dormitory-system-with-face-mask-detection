const Staff = require("../../data-models/staff");

module.exports = async (req, res, next) => {
  if (req.user) {
    const staff = await Staff.findOne({ username: req.user.username });
    if (staff) {
      next();
    } else {
      req.flash("error", "You do no have permission to enter this route");
      res.redirect("/dormitory/student/" + req.user.username);
    }
  } else {
    next();
  }
};
