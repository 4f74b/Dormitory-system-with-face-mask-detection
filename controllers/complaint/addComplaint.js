const Complaint = require("../../data-models/complaint");
const Student = require("../../data-models/student");

const addComplaint = async function (body, user) {
  let complaint = new Complaint({ ...body });
  complaint.sender = user._id;
  complaint = await complaint.save();
  const std = await Student.findByIdAndUpdate(user._id, { $push: { complaint: complaint._id } }, { useFindAndModify: true });
  return complaint;
};

module.exports = addComplaint;
