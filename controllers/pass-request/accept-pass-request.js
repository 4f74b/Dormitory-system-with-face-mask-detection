const mongoose = require("mongoose");

const PassRequest = require("../../data-models/passRequest");

module.exports = async function (requestId) {
  const request = await PassRequest.findOneAndUpdate({ _id: requestId }, { granted: true });
  return request;
};
