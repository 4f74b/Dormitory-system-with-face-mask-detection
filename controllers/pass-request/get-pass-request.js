const mongoose = require("mongoose");

const Student = require("../../data-models/student");
const PassRequest = require("../../data-models/passRequest");

module.exports = async function (req, res) {
  const hostellite = await Student.findById(req.user._id);
  let passRequest = {};
  if (hostellite) {
    if (hostellite.nightPassRequest) {
      passRequest.nightPassRequest = await PassRequest.findOne({ _id: hostellite.nightPassRequest });
    }
    if (hostellite.dayPassRequest) {
      passRequest.dayPassRequest = await PassRequest.findOne({ _id: hostellite.dayPassRequest });
    }
  }
  res.render("student/pass-request-status", { passRequest, hostellite });
};
