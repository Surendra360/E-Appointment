var express = require("express");
const userModel = require("../models/user.model");
var router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { islogin } = require("../middleware/islogin");
const appointmentModel = require("../models/appointment.model");

passport.use(new LocalStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {user: req.user});
});

router.get("/register", function (req, res, next) {
  res.render("register", {user:req.user});
});

router.get("/login", function (req, res, next) {
  res.render("login", {user: req.user});
});

router.get("/profile", islogin, async function (req, res, next) {
  // const user = await userModel.findById();
  // console.log(user);
  res.render("profile", { user: req.user });
});

router.get("/delete/:id", islogin, async (req, res, next) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.redirect("/");
    console.log("deleted");
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/update/:id",islogin, async (req, res, next) => {
  const currentUser = await userModel.findById(req.params.id);
  res.render("update", {currentUser, user:req.user});
});

router.get("/appointment", islogin, (req,res,next)=>{
  res.render("appointment", {user: req.user});
})

router.get("/allApointments", islogin, async (req,res,next)=>{
  const allApointments = await userModel.findById(req.user._id).populate("appointments")
  res.render("allApointments", {user: req.user, allApointments});
})








router.post("/register", async (req, res, next) => {
  try {
    const { fullname, username, email, phone, password } = req.body;
    await userModel.register({ fullname, username, email, phone }, password);
    res.redirect("/login");
  } catch (error) {
    res.send(error.message);
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/profile",
  }),
  (req, res, next) => {}
);

router.post("/update", async(req,res,next)=>{
  try {
    // const { fullname, username, email, phone, password } = req.body;
    await userModel.findByIdAndUpdate(req.user._id, { ...req.body });
    res.redirect("/profile");
    
  } catch (error) {
    console.log(error.message);
  }
})


router.post("/appointment", islogin,async (req,res,next)=>{
    try {

      const newAppointment = await appointmentModel({
        fullname: req.body.fullname,
        age: req.body.age,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        aadhar: req.body.aadhar,
        sedule:req.body.sedule,
        created_by: req.user._id
      })
      
      await req.user.appointments.push(newAppointment._id);

      await newAppointment.save();
      await req.user.save();

      res.redirect("/allApointments");
      console.log("appointment booked");
      
    } catch (error) {
      console.log(error.message);
    }
})

module.exports = router;
