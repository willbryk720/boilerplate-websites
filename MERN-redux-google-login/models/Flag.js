const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Flag schema. A user can flag an item for violating multiple items in a list of violations.
// There is also a textarea for more description of what the content violated

// flagTypes is a list of all the violations (in the form of strings, such as "Nudity")
// dataID is the id of the data being flagged.
// contentType is the type of that data (link, description, etc.)

const FlagSchema = new Schema({
  userCreator: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  flagTypes: [
    {
      type: String
    }
  ],
  dataID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
  textArea: {
    type: String
  },
  createDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Flag = mongoose.model("flag", FlagSchema);
