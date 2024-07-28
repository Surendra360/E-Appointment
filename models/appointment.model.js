const mongoose = require("mongoose");

const appointmentModel = new mongoose.Schema({
    fullname: String,
    age: String,
    email: String,
    gender: String,
    phone: String,
    aadhar: String,
    sedule:String, 

    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    
    status:{
        type:String,
        enum:["waiting", "booked", "progress", "complited"],
        default: "waiting"
    },

},{timestamps:true})

module.exports = mongoose.model("appointment", appointmentModel)