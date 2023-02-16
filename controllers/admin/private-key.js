const bcrypt = require("bcrypt");
const SystemKey = require("../../data-models/system-key");

module.exports.saveHash = async function (req, res, next) {
  const hash = await bcrypt.hash(req.body.newPassword, 12);
  //   delete old system password
  await SystemKey.findOneAndDelete();
  let savedHash = await SystemKey({ hash });
  savedHash = await savedHash.save();
  req.flash("success", "Successfully Changed System key");
  res.redirect("/dormitory/admin/notice-board");
};

module.exports.compareHash = async function (req, res, next) {
  const { hash } = await SystemKey.findOne();
  const result = await bcrypt.compare(req.body.oldPassword, hash);
  if (result) {
    req.flash("success", "You can change system password now...");
    res.render("admin/new-pass");
  } else {
    req.flash("error", "You entered wrong password");
    res.redirect("/dormitory/admin/system-key/change");
  }
};

module.exports.checkSystemKey = async function (req, res, next) {
  const { hash } = await SystemKey.findOne();
  const result = await bcrypt.compare(req.body.systemPassword, hash);
  if (result) {
    req.session.systemKey = true;
    res.render("admin/add-admin");
  } else {
    req.flash("error", "Wrong Password");
    res.redirect("/dormitory/admin/add-admin");
  }
};

module.exports.seedSystemKey = async function (req, res, next) {
  const hash = await bcrypt.hash("123", 12);
  //   delete old system password
  await SystemKey.findOneAndDelete();
  let savedHash = await SystemKey({ hash });
  savedHash = await savedHash.save();
  next();
};
