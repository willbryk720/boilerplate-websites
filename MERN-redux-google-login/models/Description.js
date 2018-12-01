const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DescriptionSchema = new Schema({
  userCreator: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  linkID: {
    type: Schema.Types.ObjectId,
    ref: "link",
    required: true
  },
  text: {
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

module.exports = Description = mongoose.model("description", DescriptionSchema);
