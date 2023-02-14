const mongoose = require("mongoose");

const faceSchema = new mongoose.Schema({});

const FaceModel = mongoose.model("Face", faceSchema);
module.exports = FaceModel;
