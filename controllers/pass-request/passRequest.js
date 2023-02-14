const PassRequest = require("../../data-models/passRequest");
const Student = require("../../data-models/student");

const addRequest = async function (body, student) {
  let request = new PassRequest({ ...body });
  request.senderUsername = student.username;
  request.sender = student._id;

  // get the student and add pass request id to it
  request = await request.save();

  if (request.passType == "day") {
    const updatedStudent = await Student.findOneAndUpdate({ username: student.username }, { dayPassRequest: request._id });
  } else {
    const updatedStudent = await Student.findOneAndUpdate({ username: student.username }, { nightPassRequest: request._id });
  }
};

module.exports = addRequest;
