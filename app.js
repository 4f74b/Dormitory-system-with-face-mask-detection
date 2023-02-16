const express = require("express");
// const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");

const studentRoute = require("./routes/student");
const adminRoute = require("./routes/admin");
const staffRoute = require("./routes/staff");
const isLoggedIn = require("./controllers/login/isLoggedInStudent");
const ExpressError = require("./utils/ExpressError");
const { seedSystemKey } = require("./controllers/admin/private-key");

const app = express();
const port = process.env.PORT || 3000;

// app.use(seedSystemKey);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser({ limit: "50mb" }));

// app.use(fileUpload());
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
// Setting the folder for static assets
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "/models")));

app.listen(3000, () => {
  console.log("Server started on port" + port);
});

mongoose.connect("mongodb://0.0.0.0:27017/DormitoryWithMaskDetection", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//the following will check for a successfull connection to mongodb, The above commented code can also be used
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
  console.log("database connected");
});

path.join(__dirname, "/views");

// Configure session
const sessionOptions = {
  secret: "somesecret",
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use((req, res, next) => {
  next();
});

// add currently logged in user to res.locals
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// add current url to res.locals
app.use((req, res, next) => {
  res.locals.currentUrl = req.originalUrl;
  next();
});

// ========================================Routes start from here======================

// recieve intruder face data and save it
app.post("/post-intruder", (req, res) => {
  console.log(req.body);
});

app.get("/dormitory", isLoggedIn, (req, res) => {
  res.redirect("/dormitory/student/" + req.user.username);
});
app.get("/", isLoggedIn, (req, res) => {
  res.redirect("/dormitory/student/" + req.user.username);
});
// ===============================================================Student related routes========================================
app.use("/dormitory/student", studentRoute);

// =====================================================================Admin Routes============================================
app.use("/dormitory/admin", adminRoute);

// =====================================================================Staff Routes============================================
app.use("/dormitory/staff", staffRoute);

// The following route will respond if and only if the requested path and method do not match the above specified ones
app.all("*", (req, res, next) => {
  throw new ExpressError(404, "page not found");
});

// The following is our custom error handler
app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(status).render("error", { err });
});
