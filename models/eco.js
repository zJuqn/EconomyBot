const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Economia = new Schema({
  user: { type: String },
  guild: { type: String },
  money: {
       type: Number,
       default: 0
    },
});
module.exports = mongoose.model("Economy ", Economia);