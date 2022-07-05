const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
  {
    name: { type: String, minlength: 4, required: [true, "name is required"] },
    email: { type: String, required: [true, "email is required"] },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: 4,
    },
    phoneno: { type: Number, required: [true, "phone no is required"] },
    location: { type: String, required: [true, "location is required"] },
  },
  { collection: "userscollection" }
);

const usermodel = mongoose.model("user", userschema);

module.exports = usermodel;
