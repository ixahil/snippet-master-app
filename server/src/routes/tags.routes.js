import { Router } from "express";
import { getAllTags } from "../controllers/index.js";
import { authenticate } from "../middlewares/index.js";
const router = Router();

router.get("/", authenticate, getAllTags);

export { router };
