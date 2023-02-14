const PassRequest = require("../../data-models/passRequest");

module.exports = async function (req, res) {
  let passRequest = await PassRequest.findByIdAndUpdate(req.params.id);
  if (passRequest && !passRequest.studentDeleted) {
    passRequest = await PassRequest.findByIdAndUpdate(req.params.id, { wardenDeleted: true }, { new: true });
  }
  res.send(passRequest);
};
