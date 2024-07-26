export {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from "./user.controller.js";
export {
  createNote,
  getANote,
  getAllNotes,
  updateNote,
  getNotesByLanguage,
  moveToTrash,
  undoFromTrash,
} from "./notes.controller.js";

export { getAllTags, updateTags } from "./tags.controller.js";
