const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UpDownVoteSchema = new Schema({
  userCreator: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  contentType: {
    type: Number,
    required: true
  },
  dataID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  isUpVote: {
    type: Boolean,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = UpDownVote = mongoose.model("updownvote", UpDownVoteSchema);
