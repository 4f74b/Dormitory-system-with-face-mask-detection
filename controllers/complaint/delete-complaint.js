const Complaint = require("../../data-models/complaint");
const Student = require("../../data-models/student");

module.exports = async function (id) {
  const complaint = await Complaint.findByIdAndDelete(id, { useFindAndModify: true });
  if (complaint) {
    std = await Student.findOneAndUpdate({ username: complaint.senderUsername }, { $pull: { complaint: id } }, { useFindAndModify: true, new: true });
    return complaint;
  }
};
