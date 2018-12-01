const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
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
  content: {
    type: Object,
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

module.exports = Post = mongoose.model("post", PostSchema);
