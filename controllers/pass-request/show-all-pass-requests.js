const PassRequest = require("../../data-models/passRequest");

const showAllPassRequests = async function () {
  let allPassRequests = await PassRequest.find().populate("sender", ["fullName", "hostelInfo", "profileImage"]);
  for (passRequest of allPassRequests) {
    if (passRequest.seen == false) {
      await PassRequest.findByIdAndUpdate(passRequest._id, { seen: true });
    }
  }
  allPassRequests = allPassRequests.filter((val, i, arr) => {
    return !val.wardenDeleted;
  });
  return allPassRequests;
};

module.exports = showAllPassRequests;
