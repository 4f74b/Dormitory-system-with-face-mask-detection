const mongoose = require("mongoose");
const Staff = require("../../data-models/staff");

module.exports = async function (body) {
  let staff = await Staff({ ...body });

  staff = await Staff.register(staff, body.password);
  return staff;
};
