import UserModel from "../models/user.model.js";
import {
  ApiError,
  ApiResponse,
  AsyncHandler,
  generateAccessAndRefreshTokens,
} from "../utils/index.js";
import { filePath } from "../app.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

// REGISTER
export const registerUser = AsyncHandler(async (req, res, next) => {
  const userData = req.body;
  const user = await UserModel.create(userData);
  const profile = req?.files?.profile;

  if (profile) {
    const uploadPath = filePath(
      userData.username + "." + profile.name.split(".")[1]
    );

    profile.mv(uploadPath, async function (err) {
      if (!err) {
        const profilePath = `/uploads/${profile.name}`;
        await UserModel.findByIdAndUpdate(user._id, { profile: profilePath });
      }
    });
  }

  res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});

// LOGIN
export const loginUser = AsyncHandler(async (req, res, next) => {
  const userData = req.body;
  const user = await UserModel.findOne({ username: userData.username });
  if (!user) throw new ApiError(400, "Invalid Credentials");
  const isMatch = await user.comparePassword(userData.password);
  if (!isMatch) throw new ApiError(400, "Invalid Credentials");

  const { password, ...newUser } = user._doc;

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user
  );

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, newUser, "User loggedin successfully"));
});

export const getCurrentUser = AsyncHandler(async (req, res, next) => {
  res.status(200).json(new ApiResponse(200, req.user));
});

export const logoutUser = AsyncHandler(async (req, res, next) => {
  res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, null, "User logged out successfully"));
});
