const mongoose = require("mongoose");

//create task schema

let commentschema = new mongoose.Schema({
  title: { type: String, required: [true, "Title Required"] },

  comment: [
    {
      descriptions: { type: String, required: true },
    },
  ],
});

//create model for schema

const commentmodel = mongoose.model("comment", commentschema);

//export

module.exports = commentmodel;
