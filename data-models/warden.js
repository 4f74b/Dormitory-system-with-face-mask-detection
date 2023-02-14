const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const wardenSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  recoveryQs: {
    type: String,
  },
  role: {
    type: String,
    default: "warden",
  },
});

wardenSchema.plugin(passportLocalMongoose);

const wardenModal = mongoose.model("Warden", wardenSchema);

module.exports = wardenModal;
