const mongoose = require("mongoose");
const fs = require("fs");

const noticeBoardSchema = new mongoose.Schema({
  noticeHeading: {
    type: String,
    required: true,
  },
  noticeContent: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  file: {
    type: String,
  },
});

// post findOneAndDelete
noticeBoardSchema.post("findOneAndDelete", async function (deletedNotice, next) {
  // Delete any file linked to notice board
  if (deletedNotice.file) {
    //Delete any associated files
    fs.unlink("public/hostel-files/notice-board-files/" + deletedNotice.file, (err) => {
      if (err) {
        throw err;
      }
    });
  }
});

const noticeBoardModel = mongoose.model("NoticeBoard", noticeBoardSchema);
module.exports = noticeBoardModel;
