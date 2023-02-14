const mongoose = require("mongoose");

const attendenceSchema = mongoose.Schema({
  grantedPassRequest: {
    type: mongoose.Schema.Types.ObjectId,
  },
  isPresent: {
    type: Boolean,
    default: false,
  },
});

const attendenceModal = mongoose.model("Attendence", attendenceSchema);

module.exports = attendenceModal;
