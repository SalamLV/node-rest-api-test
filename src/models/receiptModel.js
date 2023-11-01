const mongoose = require("mongoose");
const { Schema } = mongoose;

const receiptModel = new Schema({
  number: { type: Number },
  title: { type: String },
  price: { type: Number },
  date: { type: Date },
});

module.exports = mongoose.model("Receipt", receiptModel);
