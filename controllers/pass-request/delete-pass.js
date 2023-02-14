const PassRequest = require("../../data-models/passRequest");

module.exports = async function (req, res) {
  let pass = await PassRequest.findById(req.params.id);
  if (pass && !pass.granted) {
    pass = await PassRequest.findByIdAndDelete(req.params.id, { useFindAndModify: true });
    res.send(pass);
  } else {
    res.send("{failed: true}");
  }
};
