import { model, Schema } from "mongoose";
import TagModel from "./tags.model.js";

const noteSchema = new Schema({
  title: {
    type: String,
    required: [true, "Username is required"],
  },
  tags: [
    {
      type: String,
      required: [true, "At least one tag is required"],
      lowercase: true,
      trim: true,
      index: true,
    },
  ],
  description: {
    type: String,
    default: "",
  },
  snippet: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: "javascript",
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  isTrashed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User must be associated with a note"],
  },
});

noteSchema.post("save", async function (note, next) {
  try {
    // Find existing tags
    const existingTags = await TagModel.find({ title: { $in: note.tags } });
    const existingTagTitles = existingTags.map((tag) => tag.title);

    // Update existing tags with the note ID
    await Promise.all(
      existingTags.map((tag) =>
        TagModel.findByIdAndUpdate(tag._id, { $addToSet: { notes: note._id } })
      )
    );

    // Determine new tags that need to be created
    const newTags = note.tags.filter((tag) => !existingTagTitles.includes(tag));
    if (newTags.length > 0) {
      await TagModel.insertMany(
        newTags.map((tag) => ({
          title: tag,
          notes: [note._id],
          user: note.user,
        }))
      );
    }

    next(); // Proceed to the next middleware or finish the save operation
  } catch (error) {
    next(error); // Pass errors to the error handling middleware
  }
});

const createTagsIfNotExist = async (tagsArray) => {
  const existingTags = await TagModel.find({ title: { $in: tagsArray } });
  const existingTagTitles = existingTags.map((tag) => tag.title);

  const newTags = tagsArray.filter((tag) => !existingTagTitles.includes(tag));
  if (newTags.length > 0) {
    await TagModel.insertMany(newTags.map((tag) => ({ title: tag })));
  }
};

const NoteModel = model("Note", noteSchema);

export default NoteModel;
