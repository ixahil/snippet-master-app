import { Router } from "express";
import {
  createNote,
  getANote,
  getAllNotes,
  updateNote,
  getNotesByLanguage,
  moveToTrash,
  undoFromTrash,
} from "../controllers/index.js";
import { authenticate } from "../middlewares/index.js";
const router = Router();

router.post("/new", authenticate, createNote);
router.post("/:id", authenticate, updateNote);
router.get("/:id", authenticate, getANote);
router.get("/", authenticate, getAllNotes);
router.get("/language/:language", authenticate, getNotesByLanguage);

router.patch("/:id", authenticate, moveToTrash);
router.patch("/undo/:id", authenticate, undoFromTrash);

export { router };
