const mongoose = require("mongoose");
const plm  = require("passport-local-mongoose")

const userModel = new mongoose.Schema({
    fullname:String,
    username:String,
    email:String,
    phone:String,
    password:String,
    role:{
        type:String,
        enum:["admin","user"],
        default:"user",
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },

},{timestamps:true})

userModel.plugin(plm);

module.exports = mongoose.model("user", userModel)