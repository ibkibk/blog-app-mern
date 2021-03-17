import User from "../models/UserModel.js";
import HttpError from "../middlewares/httpError.js";
import asyncHandler from "../middlewares/async.js";
import validator from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "../config/config.env" });
const { validationResult } = validator;

export const getUsers = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find({}, "-password");
  if (!allUsers) {
    return next(new HttpError("Could not find any user"));
  }
  res.status(200).json({ users: allUsers });
});

export const signup = asyncHandler(async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log(error);
    return next(new HttpError("invalid inputs please check you data", 422));
  }
  const { email, password, name, image, confirmPassword } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) return res.status(400).json({ error: "User already exists" });

  if (password !== confirmPassword)
    return res.status(400).json({ error: "Password does not match" });

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    image,
    posts: [],
  });

  const token = jwt.sign(
    { userId: newUser._id, email: newUser.email },
    process.env.JWT_TOKEN,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    message: "User Signed up",
    name: newUser.name,
    userId: newUser._id,
    email: newUser.email,
    token: token,
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const oldUser = await User.findOne({ email });

  if (!oldUser) return res.status(404).json({ error: "User doesn't exist" });

  const isValidPassword = await bcrypt.compare(password, oldUser.password);
  if (!isValidPassword)
    return res.status(400).json({ error: "Password do not match" });

  const token = jwt.sign(
    { userId: oldUser._id, email: oldUser.email },
    process.env.JWT_TOKEN,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    message: "User Logged in",
    userId: oldUser._id,
    email: oldUser.email,
    token: token,
    name: oldUser.name,
  });
});
