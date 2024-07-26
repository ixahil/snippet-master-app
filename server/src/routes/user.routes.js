import { Router } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from "../controllers/index.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import fileUpload from "express-fileupload";

const router = Router();

router.post("/register", fileUpload(), registerUser);
router.post("/login", loginUser);
router.get("/me", authenticate, getCurrentUser);
router.get("/logout", authenticate, logoutUser);

export { router };
