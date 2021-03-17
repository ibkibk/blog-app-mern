import express from "express";
import { getUsers, signup, login } from "../controller/userController.js";
import validator from "express-validator";
const { check } = validator;

const router = express.Router();

router.get("/", getUsers);
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").not().isEmpty().isLength({ min: 6 }),
  ],
  signup
);

router.post("/login", login);

export default router;
