const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Banco = new Schema({
  user: { type: String },
  guild: { type: String },
  money: { 
      type: Number,
      default: 0
    },
});
module.exports = mongoose.model("Bank ", Banco);