const PassRequest = require("../../data-models/passRequest");

module.exports = async function (req, res, next) {
  const passRequests = await PassRequest.find();
  if (new Date().getHours() >= 14) {
    for (passRequest of passRequests) {
      if (passRequest.passType == "day" && !passRequest.rejected && passRequest.granted && !passRequest.expired && !passRequest.returned) {
        await PassRequest.findByIdAndUpdate(passRequest._id, { expired: true });
      }
    }
  }
  if (new Date().getHours() >= 22) {
    for (passRequest of passRequests) {
      if (passRequest.passType == "night" && !passRequest.rejected && passRequest.granted && !passRequest.expired && !passRequest.returned) {
        await PassRequest.findByIdAndUpdate(passRequest._id, { expired: true });
      }
    }
  }
  next();
};
