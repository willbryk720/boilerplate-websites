const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LinkSchema = new Schema({
  userCreator: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  categoryID: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  upVotes: {
    type: Number,
    default: 0
  },
  downVotes: {
    type: Number,
    default: 0
  },
  createDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Link = mongoose.model("link", LinkSchema);
