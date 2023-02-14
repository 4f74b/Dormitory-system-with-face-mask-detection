const Notice = require("../../data-models/notice-board");
const fs = require("fs");

const editNotice = async function (body, file, id) {
  const notice = await Notice.findOneAndUpdate({ _id: id }, body);
  //if the notice data contains file, then create a path in public directory to save it
  if (file) {
    //save the file
    fs.writeFileSync("public/hostel-files/notice-board-files/" + id + "." + file.originalname.split(".")[1], file.buffer, (err) => {
      console.log(err);
    });
    await Notice.updateOne({ _id: id }, { file: id + "." + file.originalname.split(".")[1] });
  }
  return await Notice.findOne({ _id: id });
};

module.exports = editNotice;
