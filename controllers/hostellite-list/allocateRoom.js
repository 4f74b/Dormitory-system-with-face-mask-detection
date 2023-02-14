const Hostellite = require("../../data-models/hostellite");

const allocateRoom = function (body) {
  let hostellite = new Hostellite({ ...body });
  hostellite.save();
};

module.exports = allocateRoom;
