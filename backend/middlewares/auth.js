import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/async.js";
import dotenv from "dotenv";
import HttpError from "../middlewares/httpError.js";

dotenv.config({ path: "../config.env" });
const auth = asyncHandler(async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  }
});

export default auth;
