const canvas = require("canvas");
const faceapi = require("@vladmandic/face-api/dist/face-api.node.js");
const Student = require("../../data-models/student");
const FaceModel = require("../../data-models/faceModel");
const fs = require("fs");

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

async function uploadProfile(req, res) {
  if ((await Student.findOne({ username: req.body.username })) == null) {
    const std = await Student({
      ...req.body,
    });

    //if the Student data contains file, then create a path in public directory to save it
    if (req.file) {
      //save the file
      fs.writeFileSync("public/hostel-files/hostellite-profile-images/" + req.body.username + "." + req.file.originalname.split(".")[1], req.file.buffer, (err) => {
        console.log(err);
      });
      std.profileImage = req.body.username + "." + req.file.originalname.split(".")[1];
    }
    if (req.body.descriptions.length != 0) {
      req.body.descriptions = JSON.parse(req.body.descriptions);
      const data = await FaceModel({
        username: req.body.username,
        descriptions: req.body.descriptions,
      });
      await data.save();
      std.faceDescriptions = data._id;
    }
    await Student.register(std, req.body.password);
    res.redirect("/dormitory/admin/hostellites-list");
  } else {
    req.flash("error", "A student with the provided username '" + req.body.username + "' is already registered");
    res.redirect("/dormitory/admin/add-hostellite");
  }
}

module.exports = uploadProfile;
