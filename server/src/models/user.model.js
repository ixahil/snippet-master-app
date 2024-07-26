import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    lowercase: true,
    trim: true,
    index: {
      unique: true,
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  profile: {
    type: String,
    default: "/static/placeholder.jpg",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  else {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESSTOKENSECRET,
    { expiresIn: process.env.ACCESSTOKENEXPIRATION }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.REFRESHTOKENSECRET,
    { expiresIn: process.env.REFRESHTOKENEXPIRATION }
  );
};

const UserModel = model("User", userSchema);

export default UserModel;
