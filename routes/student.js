const express = require("express");
const router = express.Router();
const configurePassportForStudent = require("../controllers/configure-passport/configure-for-student");
const passport = require("passport");
const multer = require("multer");
const logoutStudent = require("../controllers/logout/logoutStudent");
const addRequest = require("../controllers/pass-request/passRequest");
const getPassRequest = require("../controllers/pass-request/get-pass-request");
const addComplaint = require("../controllers/complaint/addComplaint");
const showHostellite = require("../controllers/CRUDHostellite/showHostellite");
const updateHostellite = require("../controllers/CRUDHostellite/updateHostellite");
const showNoticeBoard = require("../controllers/notice-boardCRUD/showNoticeBoard");
const isLoggedIn = require("../controllers/login/isLoggedInStudent");
const getComplaintLog = require("../controllers/complaint/complaint-log");
const deleteComplaint = require("../controllers/complaint/delete-complaint");
const catchAsync = require("../utils/catchAsync");
const isStudent = require("../controllers/role/isStudent");
const isAuthorized = require("../controllers/isAuthorized/isAuthorized");
const fillEditForm = require("../controllers/CRUDHostellite/fill-edit-form");
const checkTime = require("../controllers/pass-request/check-time");
const checkExpiry = require("../controllers/pass-request/check-expiry");
const deletePass = require("../controllers/pass-request/delete-pass");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use(checkExpiry);

// =================--------------------------login/logout related routes======================================================
router
  .route("/login")
  // render login form
  .get((req, res) => {
    res.render("student/login");
  })
  //   render login data
  .post(
    configurePassportForStudent,
    passport.authenticate("student", { failureFlash: true, failureRedirect: "/dormitory/student/login" }),
    catchAsync(function (req, res) {
      req.flash("success", "Welcome " + req.user.fullName);
      res.redirect("/dormitory/student/notice-board");
    })
  );

// logout Student
router.get("/logout", isLoggedIn, catchAsync(logoutStudent));

// =========================================For the following routes, check if a student is logged in=========================
router.use(catchAsync(isLoggedIn));

// =======================================---------------Pass requests routes-----------------================================
router
  .route("/post-pass-request")
  // Send a pass request
  .get(isStudent, checkTime, (req, res) => {
    res.render("student/pass-request");
  })
  // recieve pass Request Data
  .post(
    isStudent,
    checkTime,
    catchAsync((req, res) => {
      addRequest(req.body, req.user);
      req.flash("success", "Successfully added pass request");
      res.redirect("/dormitory/student/pass-request-status");
    })
  );

// Show pass request status to student
router.get("/pass-request-status", isStudent, catchAsync(getPassRequest));

router.post("/pass-request/:id/delete", catchAsync(deletePass));

// ===============================------------===========Complaint Routers------------=========================================
// Write complaint
router.get("/post-complaint", isStudent, (req, res) => {
  res.render("complaint/write-complaint");
});
// Recieve complaint request data
router.post(
  "/post-complaint/:username",
  isStudent,
  catchAsync(async (req, res) => {
    const complaint = await addComplaint(req.body, req.user);
    req.flash("success", "Successfully added complaint");
    res.redirect("/dormitory/student/complaint-log/" + req.params.username);
  })
);

//show all complaints
router.get(
  "/complaint-log/:username",
  isStudent,
  catchAsync(async (req, res) => {
    const complaints = await getComplaintLog(req.params.username);
    res.render("complaint/complaint-log", { complaints });
  })
);

router.post(
  "/complaint-log/:id/delete",
  isStudent,
  catchAsync(async (req, res) => {
    const complaint = await deleteComplaint(req.params.id);
    res.send(complaint);
  })
);

//   =====================Notice board related routes===================================================
// Show notice board
router.get(
  "/notice-board",
  isStudent,
  catchAsync(async (req, res) => {
    const noticeList = await showNoticeBoard();
    res.render("notice-board/", { noticeList });
  })
);

// ========================================Student show/read/delete-----------======================================
// Show student profile
router.get("/:username", catchAsync(isAuthorized), catchAsync(showHostellite));

// Show account settings for student and also update and delete routes
router.route("/:username/edit").get(catchAsync(isAuthorized), catchAsync(fillEditForm)).post(upload.single("profileImage"), catchAsync(updateHostellite));

module.exports = router;
