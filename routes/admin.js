const express = require("express");
const router = express.Router();
const configurePassportForAdmin = require("../controllers/configure-passport/configure-for-admin");
const passport = require("passport");
const multer = require("multer");

const deleteHostellite = require("../controllers/CRUDHostellite/deleteHostellite");
const addWarden = require("../controllers/admin/add-admin");
const addStaff = require("../controllers/admin/add-staff");
const isWarden = require("../controllers/role/isWarden");
const showAllPassRequests = require("../controllers/pass-request/show-all-pass-requests");
const deletePassRequest = require("../controllers/admin/delete-pass-request");
const showHostelliteList = require("../controllers/hostellite-list/show-hostellites-list");
const allocateRoom = require("../controllers/hostellite-list/allocateRoom");
const showNoticeBoard = require("../controllers/notice-boardCRUD/showNoticeBoard");
const registerFace = require("../controllers/register-face/register");
const addNotice = require("../controllers/notice-boardCRUD/addNotice");
const deleteNotice = require("../controllers/notice-boardCRUD/delete-notice");
const editNotice = require("../controllers/notice-boardCRUD/editNotice");
const acceptPassRequest = require("../controllers/pass-request/accept-pass-request");
const declinePassRequest = require("../controllers/pass-request/decline-pass-request");
const showAttendenceList = require("../controllers/admin/show-attendence-list");
const checkExistance = require("../checkExistance");
const markReturned = require("../controllers/pass-request/mark-returned");
const logoutWarden = require("../controllers/logout/logoutWarden");
const isLoggedIn = require("../controllers/login/isLoggedInWarden");
const showAllComplaints = require("../controllers/admin/show-all-complaints");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const { saveHash, compareHash, checkSystemKey } = require("../controllers/admin/private-key");
const isLoggedIntoSystem = require("../controllers/admin/is-logged-into-system");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// =====================================================Seed temporary system key===============================================
// router.use(async (req, res, next) => {
//   const hash = await bcrypt.hash("123", 12);
//   const hashSaved = await SystemKey({ hash });
//   await hashSaved.save();
//   next();
// });

// ==========================================================================Add admin=============================================
router
  .route("/add-admin")
  .get((req, res) => {
    res.render("admin/pre-add-admin");
  })
  .post(catchAsync(checkSystemKey));

router.post(
  "/add-admin/new-admin",
  isLoggedIntoSystem,
  catchAsync(async (req, res) => {
    const warden = await addWarden(req.body);
    req.flash("success", "Successfylly added new admin: " + warden.FullName + ". He/She can now log into the system as admin.");
    res.redirect("/dormitory/admin/add-admin");
  })
);

// ===============================================================Login/logout admin=============================================
router
  .route("/login")
  .get((req, res) => {
    res.render("admin/login");
  })
  .post(configurePassportForAdmin, passport.authenticate("warden", { failureFlash: true, failureRedirect: "/dormitory/admin/login" }), function (req, res) {
    res.redirect("/dormitory/admin/pass-requests");
  });

router.get("/logout", logoutWarden);

// ==========================================Do not let student enter into admin routes======================================
router.use(isLoggedIn, catchAsync(isWarden));

// ==========================================================================Change System Key=============================================
router
  .route("/system-key/change")
  .get((req, res) => {
    res.render("admin/hash");
  })
  .post(catchAsync(saveHash));

router.post("/system-key/check", catchAsync(compareHash));

// ===================================================Dangling routes redirect=============================================
router.get("/", (req, res) => {
  res.redirect("/dormitory/admin/pass-requests");
});

// ==========================================================Serviellance===================================================
// Surveillance page
router.route("/surveillance").get((req, res) => {
  res.render("surveillance/surveillance");
});
// recieve data of a face and detect wheter the person is present in database
router.post(
  "/check-face",
  catchAsync(async (req, res) => {
    const response = await checkExistance(req.body);
    if (response._label != "unknown") {
      res.send(await markReturned(response._label));
    } else {
      res.send({});
    }
  })
);

// ===========================================================hostellite crud=====================================================
router
  .route("/add-hostellite")
  .get((req, res) => {
    res.render("register/face-form");
  })
  // recieve data of new hostellite
  .post(
    upload.single("profileImage"),
    catchAsync(async (req, res) => {
      const student = await registerFace(req.body, req.file);
      req.flash("success", "Successfully added new hostellite");
      res.redirect("/dormitory/admin/hostellites-list");
    })
  );

// Delete a hostellite
router.post(
  "/student/:username/delete",
  catchAsync(async (req, res) => {
    const deletedHostellite = await deleteHostellite(req.params.username);
    res.send({ deleted: true });
  })
);

// ==========================================================================Add Staff=============================================
router
  .route("/add-staff")
  .get((req, res) => {
    res.render("admin/add-staff");
  })
  .post(
    catchAsync(async (req, res) => {
      const staff = await addStaff(req.body);
      console.log(staff);
      req.flash("success", "Successfully added staff: " + staff.FullName);
      res.redirect("/dormitory/admin/notice-board");
    })
  );

// ===============================================================pass requests======================================
router.get(
  "/pass-requests",
  catchAsync(async (req, res) => {
    const allPassRequests = await showAllPassRequests();
    res.render("admin/show-pass-requests", { allPassRequests });
  })
);

router.post(
  "/pass-request/:id/accept",
  catchAsync(async (req, res) => {
    const request = await acceptPassRequest(req.params.id);
    res.send(request);
  })
);

router.post(
  "/pass-request/:id/decline",
  catchAsync(async (req, res) => {
    const request = await declinePassRequest(req.body.passReason, req.params.id);
    res.redirect("/dormitory/admin/pass-requests");
  })
);
router.post("/pass-request/:id/delete", catchAsync(deletePassRequest));

// ===============================================================Complaints======================================
router.get("/complaints", showAllComplaints);

// ===============================================================attendence List============================================
router.get(
  "/attendence-list",
  catchAsync(async (req, res) => {
    const attendenceList = await showAttendenceList();
    res.render("admin/attendence-list", { attendenceList });
  })
);

//===============================================================show hostelites List========================================
router.get(
  "/hostellites-list",
  catchAsync(async (req, res) => {
    const hostelliteList = await showHostelliteList();
    res.render("admin/hostelites-list", { hostelliteList });
  })
);

// ===============================================================Allocate Rooms Route====================================
router.post("/allocate-room", (req, res) => {
  allocateRoom(req.body);
  res.redirect("/hostellites-list");
});

// ===============================================================notice board crud==========================================
router
  .route("/notice-board")
  .get(
    catchAsync(async (req, res) => {
      const noticeList = await showNoticeBoard();
      res.render("notice-board/", { noticeList });
    })
  )
  .post(
    upload.single("noticeFile"),
    catchAsync(async (req, res) => {
      addNotice(req.body, req.file);
      res.redirect("/dormitory/admin/notice-board");
    })
  );

// Delete a previous notice
router.post(
  "/notice-board/:id/delete",
  catchAsync(async (req, res) => {
    const deletedNotice = await deleteNotice(req.params.id);
    res.send(deletedNotice);
  })
);
// edit a previous notice
router.post(
  "/notice-board/:id/edit",
  upload.single("noticeFile"),
  catchAsync(async (req, res) => {
    const update = await editNotice(req.body, req.file, req.params.id);
    res.redirect("/dormitory/admin/notice-board");
  })
);

module.exports = router;
