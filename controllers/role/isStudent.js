const Student = require("../../data-models/student");

module.exports = async (req, res, next) => {
  if (req.user) {
    const user = await Student.findOne({ username: req.user.username });
    if (user) {
      next();
    } else {
      req.flash("error", "You do no have permission to enter this route");
      res.redirect("/dormitory/admin/hostellites-list");
    }
  } else {
    next();
  }
};
