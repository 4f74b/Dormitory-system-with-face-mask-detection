const Complaint = require("../../data-models/complaint");
const Student = require("../../data-models/student");

module.exports = async function (studentUsername) {
  const std = await Student.findOne({ username: studentUsername });
  let complaints = [];
  if (std.complaint.length) {
    for (complaintId of std.complaint) {
      complaints.push(await Complaint.findById(complaintId));
    }
  }
  return complaints;
};
