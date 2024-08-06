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

//logout
router.get("/logout",islogin, (req, res, next)=> {
  req.logout(()=>{
    res.redirect("/");
  });
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

router.get("/adminProfile", async (req,res,next)=>{
  res.render("adminProfile", {user:req.user});
})
router.get("/adminAllUser", islogin, async(req,res,nexr)=>{
  try {
    const Users = await userModel.find().populate("appointments");
    res.render("adminAllUser", {allUsers:Users, user:req.user});
  } catch (error) {
    console.log(error);
  }
})











router.post("/register", async (req, res, next) => {
  try {
    const { fullname, username, email, phone, password, role } = req.body;
    await userModel.register({ fullname, username, email, phone, role }, password);
    res.redirect("/login");
  } catch (error) {
    res.send(error.message);
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  (req, res, next) => {
    if(req.user.role == "admin"){
      res.redirect("/adminProfile");
    }else{
      res.redirect("/profile");
    }
  }
);

router.post("/update", async(req,res,next)=>{
  try {
    // const { fullname, username, email, phone, password } = req.body;
    const user = req.user;
    await userModel.findByIdAndUpdate(req.user._id, { ...req.body });
    if(user){
      if(user.role == "admin"){
        res.redirect("/adminProfile");
      }else{
        res.redirect("/profile");
      }
    }
    
  } catch (error) {
    console.log(error.message);
  }
})


router.post("/appointment", islogin,async (req,res,next)=>{
    try {
      const user = await userModel.findOne({username:req.session.passport.user})
      const newAppointment = await appointmentModel({
        fullname: req.body.fullname,
        age: req.body.age,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        aadhar: req.body.aadhar,
        sedule:req.body.sedule,
        status:req.body.status,
        created_by: req.user._id
      })
      
      await user.appointments.push(newAppointment._id);

      await newAppointment.save();
      await user.save();
      console.log(user);
      res.redirect("/allApointments");
      console.log("appointment booked");
      
    } catch (error) {
      console.log(error.message);
    }
})

router.post("/updateAppointment/:id", islogin, async(req,res,next)=>{
  console.log(req.body);
  try {
    const status = req.body.status;
    let response = await appointmentModel.findByIdAndUpdate(req.params.id,{status},{new:true});
    console.log(response);
    res.redirect("/adminAllUser")
  } catch (error) {
    console.log(error);
  }
})


module.exports = router;
