import NoteModel from "../models/notes.model.js";
import { ApiError, ApiResponse, AsyncHandler } from "../utils/index.js";
import { updateTags } from "./index.js";

export const createNote = AsyncHandler(async (req, res, next) => {
  const newNote = await NoteModel.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json(new ApiResponse(201, newNote));
});

export const getANote = AsyncHandler(async (req, res, next) => {
  const note = await NoteModel.findById(req.params.id).populate("user");
  if (req.user.username !== note.user.username) {
    throw new ApiError(400, "Not Found");
  }
  res.status(200).json(new ApiResponse(200, note));
});

export const getAllNotes = AsyncHandler(async (req, res, next) => {
  const tags = req.query?.tags?.split(" ") || [];
  const isFavorite = req.query?.isfavorite || "";
  const isTrashed = req.query?.istrashed || "";
  const search = req.query?.search || "";
  const query = { user: req.user._id };
  if (tags.length > 0) {
    query.tags = { $in: tags };
  }
  if (isFavorite) {
    query.isFavorite = true;
  }
  if (isTrashed) {
    query.isTrashed = true;
  }

  if (search) {
    const regex = new RegExp(search, "i");
    query.title = { $regex: regex };
  }

  const notes = await NoteModel.find(query);
  res.status(200).json(new ApiResponse(200, notes));
});

export const updateNote = AsyncHandler(async (req, res, next) => {
  const oldNote = await NoteModel.findByIdAndUpdate(req.params.id, req.body, {
    new: false,
  });

  if (!oldNote) {
    throw new ApiError(400, "Not Found");
  }

  await updateTags(oldNote._id, oldNote.user, req.body.tags, oldNote.tags);

  res.status(200).json(new ApiResponse(200, oldNote, "Updated Successfully"));
});

export const getNotesByLanguage = AsyncHandler(async (req, res, next) => {
  const notes = await NoteModel.find({
    user: req.user._id,
    language: req.params.language,
  });

  res.status(200).json(new ApiResponse(200, notes));
});

export const moveToTrash = AsyncHandler(async (req, res, next) => {
  const note = await NoteModel.findByIdAndUpdate(
    req.params.id,
    { isTrashed: true },
    { new: false }
  );
  res
    .status(200)
    .json(new ApiResponse(200, note, "Moved to trash successfully!"));
});

export const undoFromTrash = AsyncHandler(async (req, res, next) => {
  const note = await NoteModel.findByIdAndUpdate(
    req.params.id,
    { isTrashed: false },
    { new: false }
  );

  res
    .status(200)
    .json(new ApiResponse(200, note, "Undo from trash successfully!"));
});
