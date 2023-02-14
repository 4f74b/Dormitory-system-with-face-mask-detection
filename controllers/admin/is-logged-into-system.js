module.exports = async function (req, res, next) {
  if (req.session.systemKey) {
    next();
  } else {
    req.flash("error", "You must log into system first");
    res.redirect("/dormitory/admin/add-admin");
  }
};
