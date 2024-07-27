var express = require('express');
const userModel = require('../models/user.model');
var router = express.Router();
const passport = require("passport")
const LocalStrategy = require("passport-local");

passport.use(new LocalStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/profile', async function(req, res, next) {
  const user = await userModel.findById()
  console.log(user);
  res.render('profile', {user:req.user});
});

router.get("/delete/:id", async(req,res,next)=>{
  try {
    await userModel.findByIdAndDelete(req.params.id)
    res.redirect("/");
    console.log("deleted");
  } catch (error) {
    console.log(error.message);
  }
})





router.post("/register", async(req,res,next)=>{
  try {
    const { fullname, username, email, phone, password } = req.body
    await userModel.register({fullname, username, email, phone}, password);
    res.redirect("/login")
  } catch (error) {
    res.send(error.message)
  }
})

router.post("/login", passport.authenticate("local", {successRedirect: "/profile", failureRedirect:"/login"}) ,(req,res,next)=>{
  
})

module.exports = router;
