const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const userModel = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Fullname is required"],
      minLength: [4, "Full Name must have atleast 4 characters"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      minLength: [4, "Username must have atleast 4 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Mobile number is required"],
      minLength: [10, "Mobile number must have atleast 10 characters"],
      maxLength: [10, "Mobile number must not exceed 10 characters"],
      trim: true,
    },
    password: {
        type: String,
      },
    role: {
      type: String,
      enum: ["admin", "user"],
      require: true,
    },
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "appointment",
      },
    ],
  },
  { timestamps: true }
);

userModel.plugin(plm);

module.exports = mongoose.model("user", userModel);
