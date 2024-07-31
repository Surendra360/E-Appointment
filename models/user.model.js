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
        require: true,
    },
    appointments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"appointment"
    }],

},{timestamps:true})

userModel.plugin(plm);

module.exports = mongoose.model("user", userModel)