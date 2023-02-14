const mongoose = require("mongoose");

const NoticeBoard = require("../../data-models/notice-board");

const deleteNotice = async function (id) {
  const notice = await NoticeBoard.findOneAndDelete({ _id: id });
  return notice;
};

module.exports = deleteNotice;
