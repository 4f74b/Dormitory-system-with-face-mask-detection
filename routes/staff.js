const express = require("express");
const router = express.Router();
const configurePassportForStaff = require("../controllers/configure-passport/configure-for-staff");
const passport = require("passport");
const multer = require("multer");

const deleteHostellite = require("../controllers/CRUDHostellite/deleteHostellite");
const isStaff = require("../controllers/role/isStaff");
const showHostelliteList = require("../controllers/hostellite-list/show-hostellites-list");
const allocateRoom = require("../controllers/hostellite-list/allocateRoom");
const registerFace = require("../controllers/register-face/register");
const logoutStaff = require("../controllers/logout/logoutStaff");
const isLoggedIn = require("../controllers/login/isLoggedInStaff");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ===============================================================Login/logout staff=============================================
router
  .route("/login")
  .get((req, res) => {
    res.render("staff/login");
  })
  .post(configurePassportForStaff, passport.authenticate("staff", { failureFlash: true, failureRedirect: "/dormitory/staff/login" }), function (req, res) {
    res.redirect("/dormitory/staff/hostellites-list");
  });

router.get("/logout", logoutStaff);

// ==========================================Do not let student enter into admin routes======================================
router.use(isLoggedIn, catchAsync(isStaff));

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
      res.redirect("/dormitory/staff/hostellites-list");
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

module.exports = router;
