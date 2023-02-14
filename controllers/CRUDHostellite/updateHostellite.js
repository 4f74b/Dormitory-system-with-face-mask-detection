const mongoose = require("mongoose");
const Student = require("../../data-models/student");
const fs = require("fs");

const updateHostellite = async function (req, res) {
  const update = await Student.updateOne({ username: req.params.username }, { ...req.body });

  if (req.body.password != "") {
    Student.findOne({ username: req.params.username }, (err, user) => {
      user.setPassword(req.body.password, function (err, user) {
        Student.updateOne({ username: req.params.username }, { hash: user.hash, salt: user.salt }, (err, result) => {
          if (err) {
            res.render("view", { err });
          }
        });
      });
    });
  }

  if (req.file) {
    //save the file
    fs.writeFileSync("public/hostel-files/hostellite-profile-images/" + req.params.username + "." + req.file.originalname.split(".")[1], req.file.buffer, (err) => {
      res.render("view", { err });
    });
    const res = await Student.updateOne({ username: req.params.username }, { profileImage: req.params.username + "." + req.file.originalname.split(".")[1] });
  }
  res.redirect("/dormitory/student/" + req.params.username);

  // return await Student.findOne({ username: req.params.username });
};

module.exports = updateHostellite;
