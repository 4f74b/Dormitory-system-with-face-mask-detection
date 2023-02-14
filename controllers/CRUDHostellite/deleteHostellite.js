const mongoose = require("mongoose");
const Student = require("../../data-models/student");

const deleteHostellite = async function (username) {
  const deletedData = await Student.findOneAndDelete({ username });
};

module.exports = deleteHostellite;
