const mongoose = require("mongoose");

const NoticeBoard = require("../../data-models/notice-board");

const showNoticeBoard = async function () {
  const noticeData = await NoticeBoard.find();
  return noticeData;
};

module.exports = showNoticeBoard;
