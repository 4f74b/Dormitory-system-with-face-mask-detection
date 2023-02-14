const Complaint = require("../../data-models/complaint");

module.exports = async function (req, res) {
  const complaints = await Complaint.find().populate("sender", ["fullName", "hostelInfo", "profileImage", "username"]);
  res.render("admin/show-complaints", { complaints });
};
