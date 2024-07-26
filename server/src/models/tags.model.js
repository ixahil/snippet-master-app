import { model, Schema } from "mongoose";

const tagSchema = new Schema({
  title: {
    type: String,
    required: [true, "tag name is required"],
    lowercase: true,
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User must be associated with a note"],
  },
});

const TagModel = model("Tag", tagSchema);

export default TagModel;
