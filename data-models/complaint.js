const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  complaintHeading: {
    type: String,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  formattedComplaint: {
    type: String,
    required: true,
  },
  complaintDate: {
    type: Date,
    default: Date.now,
  },
});

const complaintModal = mongoose.model("Complaint", complaintSchema);

module.exports = complaintModal;
