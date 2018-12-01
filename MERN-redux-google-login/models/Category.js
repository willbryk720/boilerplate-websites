const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CategorySchema = new Schema({
  userCreator: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  description: {
    type: String,
    required: true
  },
  parentCategoryIDs: [
    {
      type: Schema.Types.ObjectId,
      ref: "categorys"
    }
  ],
  childCategoryIDs: [
    {
      type: Schema.Types.ObjectId,
      ref: "categorys"
    }
  ],
  createDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Category = mongoose.model("category", CategorySchema);
