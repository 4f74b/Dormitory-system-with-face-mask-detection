const mongoose = require("mongoose");
const Warden = require("../../data-models/warden");

module.exports = async function (body) {
  let warden = await Warden({ ...body });

  warden = await Warden.register(warden, body.password);
  return warden;
};
