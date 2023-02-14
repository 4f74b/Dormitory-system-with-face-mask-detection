const PassRequest = require("../../data-models/passRequest");

module.exports = async function () {
  const allPassRequests = await PassRequest.find().populate("sender", ["fullName", "hostelInfo", "profileImage"]);
  const attendenceList = allPassRequests.filter((val, i, arr) => {
    return val.granted == true || val.rejected;
  });
  return attendenceList.reverse();
};
