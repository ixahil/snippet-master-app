import TagModel from "../models/tags.model.js";
import { ApiResponse, AsyncHandler } from "../utils/index.js";

export const getAllTags = AsyncHandler(async (req, res, next) => {
  const tags = await TagModel.find({ user: req.user._id });
  res.status(200).json(new ApiResponse(200, tags));
});

export const updateTags = async (noteId, userId, newTags, oldTags) => {
  const existingTags = await TagModel.find({ title: { $in: newTags } });
  const existingTagsTitles = existingTags.map((t) => t.title);
  await Promise.all(
    existingTags.map((t) =>
      TagModel.findByIdAndUpdate(t._id, { $addToSet: { notes: noteId } })
    )
  );

  // Determine New Tags
  const newTagsToAdd = newTags.filter(
    (tag) => !existingTagsTitles.includes(tag)
  );
  await Promise.all(
    newTagsToAdd.map((tag) =>
      TagModel.findOneAndUpdate(
        { title: tag },
        { $setOnInsert: { user: userId, notes: [noteId] } },
        { upsert: true }
      )
    )
  );

  // Determine Tags to Remove
  const tagsToRemove = oldTags.filter((tag) => !newTags.includes(tag));
  await Promise.all(
    tagsToRemove.map((tag) =>
      TagModel.findOneAndUpdate(
        { title: tag },
        { $pull: { notes: noteId } },
        { multi: true }
      )
    )
  );
};
