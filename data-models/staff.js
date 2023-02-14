const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");

const staffSchema = mongoose.Schema({
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
    default: "staff",
  },
});

staffSchema.plugin(passportLocalMongoose);
const staffModal = mongoose.model("Staff", staffSchema);

module.exports = staffModal;
