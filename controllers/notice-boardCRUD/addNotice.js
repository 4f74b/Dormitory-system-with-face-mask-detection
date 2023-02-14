const Notice = require("../../data-models/notice-board");
const fs = require("fs");

async function addNotice(body, file) {
  let notice = await new Notice({
    noticeHeading: body.noticeHeading,
    noticeContent: body.noticeContent,
  });

  //if the notice data contains file, then create a path in public directory to save it
  if (file) {
    //save the file
    fs.writeFileSync("public/hostel-files/notice-board-files/" + notice._id + "." + file.originalname.split(".")[1], file.buffer, (err) => {
      console.log(err);
    });
    notice.file = notice._id + "." + file.originalname.split(".")[1];
  }
  notice = await notice.save();
}

module.exports = addNotice;
