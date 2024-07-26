import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import expressListEndpoints from "express-list-endpoints";
import { databaseConnection } from "./config/db.js";
import fs from "fs";

configDotenv();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDirectoryPath = path.join(__dirname, "..", "public");

export const filePath = (name) => {
  const existingPath = path.join(__dirname, "../public/uploads", name);
  if (!fs.existsSync(existingPath)) {
    fs.mkdirSync(path.dirname(existingPath), { recursive: true });
  }
  return existingPath;
};

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = process.env.ORIGIN;
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.set("views", path.join(__dirname, "../views"));

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use("/public", express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.render("pages/index", { endpoints });
});

// ROUTES IMPLEMENTING

//// IMPORTS
import { notesRouter, tagsRouter, userRouter } from "./routes/index.js";
import errorHandler from "./middlewares/error.middleware.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/notes", notesRouter);
app.use("/api/v1/tags", tagsRouter);

//////////////////////////////

app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Page not found",
  });
});

// Error Handlers

app.use(errorHandler);

/////////////////////////

const startServer = () =>
  app.listen(process.env.PORT, () => {
    console.log(" ⚙️  Server listening on: " + process.env.PORT);
  });

try {
  await databaseConnection();
  startServer();
} catch (error) {
  console.log("MongoDB Error: " + error);
}
