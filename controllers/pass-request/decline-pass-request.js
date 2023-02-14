const PassRequest = require("../../data-models/passRequest");

module.exports = async function (declineReason, requestId) {
  let request = await PassRequest.findOneAndUpdate({ _id: requestId }, { rejected: true });
  if (declineReason) {
    request = await PassRequest.findOneAndUpdate({ _id: requestId }, { declineReason });
  }
  return request;
};
