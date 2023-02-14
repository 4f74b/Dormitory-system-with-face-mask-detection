const Student = require("../../data-models/student");

module.exports = async function (req, res) {
  const hostelliteInfo = await Student.findOne({ username: req.params.username });
  res.render("student/account-settings", { hostelliteInfo });
};
