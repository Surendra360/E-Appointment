const mongoose = require("mongoose");

const appointmentModel = new mongoose.Schema({
    name: String, // name of the patient
    email: String, // email of the patient
    phone: String, // phone number of the patient
    aadharNumver: String, // aadhar number of the patient

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    appointment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
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