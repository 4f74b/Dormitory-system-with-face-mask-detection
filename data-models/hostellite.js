const mongoose = require("mongoose");

const hostelliteSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  hostelNo: {
    type: String,
    required: true,
  },
  roomNo: {
    type: String,
    required: true,
  },
});

const hostelliteModel = mongoose.model("Hostellite", hostelliteSchema);

module.exports = hostelliteModel;
