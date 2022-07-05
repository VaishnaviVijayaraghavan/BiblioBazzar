const mongoose = require("mongoose");
//const moment=require("react-moment")
const favouriteschema = new mongoose.Schema({
  name: { type: String, required: true },
  favourites: [
    {
      cover: { type: String, required: true },
      title: { type: String, required: true },
      author: { type: String, required: true },
      genre: { type: String, required: true },
      year: { type: Number, required: true },
    },
  ],
});

const favouritemodel = mongoose.model("favourite", favouriteschema);

module.exports = favouritemodel;
