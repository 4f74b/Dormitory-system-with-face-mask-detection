const canvas = require("canvas");
const faceapi = require("@vladmandic/face-api/dist/face-api.node.js");
const FaceModel = require("./data-models/faceModel");

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

async function checkExistance(file, label) {
  // await faceapi.nets.ssdMobilenetv1.loadFromDisk("./models");
  // await faceapi.nets.faceRecognitionNet.loadFromDisk("./models");
  // await faceapi.nets.faceLandmark68Net.loadFromDisk("./models");

  // optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
  //   minConfidence: 0.9,
  // });

  // Get all the faces stored in database
  const faces = await FaceModel.find();

  // loop through each face and then make the contents of it's descriptions array as Float32Array type
  for (i = 0; i < faces.length; i++) {
    // Change the face data descriptors from Objects to Float32Array type
    for (let j = 0; j < faces[i].descriptions.length; j++) {
      faces[i].descriptions[j] = new Float32Array(
        Object.values(faces[i].descriptions[j])
      );
    }

    // Now make labeledFaceDescriptors and save them back to  the array
    faces[i] = new faceapi.LabeledFaceDescriptors(
      faces[i].username,
      faces[i].descriptions
    );
  }
  // Load face matcher with the array of all the faces from database. This array of database is been altered so that it's description part contain elements that are of Float32Array type
  if (faces.length != 0) {
    const faceMatcher = new faceapi.FaceMatcher(faces, 0.45);
    // loop through each of the faces found in the image and then compare them with the images of database
    let results = faceMatcher.findBestMatch(
      new Float32Array(Object.values(file.descriptor))
    );
    return results;
  }
  return false;
}

module.exports = checkExistance;
