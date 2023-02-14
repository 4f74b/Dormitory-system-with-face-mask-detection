const mongoose = require("mongoose");

const systemKeySchema = mongoose.Schema({
  hash: {
    type: String,
  },
});

const systemKeyModal = mongoose.model("SystemKey", systemKeySchema);
module.exports = systemKeyModal;
