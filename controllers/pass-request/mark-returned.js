const PassRequest = require("../../data-models/passRequest");
const Student = require("../../data-models/student");

module.exports = async function (studentUsername) {
  const std = await Student.findOne({ username: studentUsername });

  //   If the detected student has a pass request then mark it as returned
  let passRequests = {};
  if (std.nightPassRequest) {
    let request = await PassRequest.findById(std.nightPassRequest).populate("sender", ["fullName", "hostelInfo", "profileImage", "username"]);
    if (request.granted && !request.rejected && !request.wardenDeleted && !request.returned && !request.expired) {
      await PassRequest.findByIdAndUpdate(std.nightPassRequest, { returned: true, returnTime: Date.now() });
      passRequests.nightPassRequest = request;
    }
  }
  if (std.dayPassRequest) {
    let request = await PassRequest.findById(std.dayPassRequest).populate("sender", ["fullName", "hostelInfo", "profileImage", "username"]);
    if (request.granted == true && !request.rejected && !request.wardenDeleted && !request.returned && !request.expired) {
      await PassRequest.findByIdAndUpdate(std.dayPassRequest, { returned: true, returnTime: Date.now() });
      passRequests.dayPassRequest = request;
    }
  }
  return passRequests;
};
