const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  senderUsername: {
    type: String,
    required: true,
  },
  passReason: {
    type: String,
  },
  passType: {
    type: String,
  },
  passTime: {
    type: Date,
    default: Date.now,
  },
  granted: {
    type: Boolean,
    default: false,
  },
  rejected: {
    type: Boolean,
    default: false,
  },
  declineReason: {
    type: String,
  },
  returned: {
    type: Boolean,
    default: false,
  },
  returnTime: {
    type: Date,
  },
  seen: {
    type: Boolean,
    default: false,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  expired: {
    type: Boolean,
    default: false,
  },
  wardenDeleted: {
    type: Boolean,
    default: false,
  },
  studentDeleted: {
    type: Boolean,
    default: false,
  },
});

const passRequestModel = mongoose.model("PassRequest", requestSchema);

module.exports = passRequestModel;
