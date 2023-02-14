const canvas = require("canvas");
const faceapi = require("@vladmandic/face-api/dist/face-api.node.js");
const Student = require("../../data-models/student");
const FaceModel = require("../../data-models/faceModel");
const fs = require("fs");

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

async function uploadProfile(body, file) {
  const std = await Student({
    ...body,
  });

  //if the Student data contains file, then create a path in public directory to save it
  if (file) {
    //save the file
    fs.writeFileSync("public/hostel-files/hostellite-profile-images/" + body.username + "." + file.originalname.split(".")[1], file.buffer, (err) => {
      console.log(err);
    });
    std.profileImage = body.username + "." + file.originalname.split(".")[1];
  }

  if (body.descriptions.length != 0) {
    body.descriptions = JSON.parse(body.descriptions);
    const data = await FaceModel({
      username: body.username,
      descriptions: body.descriptions,
    });

    await data.save();
    std.faceDescriptions = data._id;
  }
  return await Student.register(std, body.password);
}

module.exports = uploadProfile;
