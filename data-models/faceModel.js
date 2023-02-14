const mongoose = require("mongoose");

const faceSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  descriptions: {
    type: Array,
    required: true,
  },
});

const FaceModel = mongoose.model("Face", faceSchema);
module.exports = FaceModel;
