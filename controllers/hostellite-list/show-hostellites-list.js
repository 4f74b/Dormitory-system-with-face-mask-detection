const mongoose = require("mongoose");
const Student = require("../../data-models/student");

const showAll = async function () {
  const hostelliteList = Student.find().exec();
  return hostelliteList;
};

module.exports = showAll;
