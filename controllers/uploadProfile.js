// const save = require("../utils/saveFile");
// const path = require("path");
// const tf = require("@tensorflow/tfjs-node");
// const canvas = require("canvas");
// const faceapi = require("@vladmandic/face-api/dist/face-api.node.js");
// const modelPathRoot = "../models";
// const mongoose = require("mongoose");
// const FaceModel = require("../data-models/faceModel");

// let optionsSSDMobileNet;

// const { Canvas, Image, ImageData } = canvas;
// faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// async function image(file) {
//   const decoded = tf.node.decodeBmp(file);
//   const casted = decoded.toFloat();
//   const result = casted.expandDims(0);
//   decoded.dispose();
//   casted.dispose();
//   return result;
// }

// async function detect(tensor) {
//   const result = await faceapi
//     .detectAllFaces(tensor, optionsSSDMobileNet)
//     .withFaceLandmarks()
//     .withFaceDescriptors();
//   return result;
// }

// async function uploadProfile(file, label) {
//   await faceapi.tf.setBackend("tensorflow");
//   await faceapi.tf.enableProdMode();
//   await faceapi.tf.ENV.set("DEBUG", false);
//   await faceapi.tf.ready();

//   const modelPath = path.join(__dirname, modelPathRoot);
//   await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
//   await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
//   await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
//   await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);

//   optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
//     minConfidence: 0.5,
//   });

//   // const tensor = await image(file);
//   // const result = await detect(tensor);
//   const temp = await faceapi.detectAllFaces(file);
//   console.log(temp);

//   // let descriptions = [];
//   // descriptions[0] = result[0].descriptor;

//   // const dataToBeSaved = new FaceModel({
//   //   label: label,
//   //   descriptions: descriptions,
//   // });
//   // await dataToBeSaved.save();

//   tensor.dispose();

//   return result;
// }

// module.exports = uploadProfile;
