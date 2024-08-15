const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const appointmentModel = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Fullname is required"],
        minLength: [4, "Full Name must have atleast 4 characters"],
        trim: true,
      },
    age: {
        type: Number,
        required: [true, "Age is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
    },
    phone: {
        type: String,
      required: [true, "Mobile number is required"],
      minLength: [10, "Mobile number must have atleast 10 characters"],
      maxLength: [10, "Mobile number must not exceed 10 characters"],
      trim: true,

    },
    aadhar: {
        type: Number,
        required: [true, "Aadhar number is required"],
        unique: true,
        minLength: [12, "Aadhar number must have atleast 12 characters"],
      maxLength: [12, "Aadhar number must not exceed 12 characters"],
      trim: true,
    },
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
        default:"panding",
    },

},{timestamps:true})

module.exports = mongoose.model("appointment", appointmentModel)