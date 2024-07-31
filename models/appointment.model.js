const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const appointmentModel = new mongoose.Schema({
    fullname: String,
    age: String,
    email: String,
    gender: String,
    phone: String,
    aadhar: String,
    sedule:{
        type:Date,
        require: true,
    }, 

    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    
    status:{
        type:String,
        enum:["panding", "approved", "rejected", "cancelled"],
    },

},{timestamps:true})

module.exports = mongoose.model("appointment", appointmentModel)