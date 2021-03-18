import express from "express";
import validator from "express-validator";
import {
  getAllPosts,
  createAPosts,
  updateAPosts,
  deleteAPosts,
  getAPost,
  getPostsByUserIdPost,
  likePost,
} from "../controller/postController.js";
import auth from "../middlewares/auth.js";
// import fileUpload from "../middlewares/file-upload.js";

const { check } = validator;

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:pid", getAPost);
router.get("/user/:uid", getPostsByUserIdPost);
router.use(auth);

router.post(
  "/",
  // fileUpload.single("image"),
  [
    check("title").not().isEmpty().isLength({ min: 5 }),
    check("description").not().isEmpty().isLength({ min: 5 }),
  ],
  createAPosts
);

router.patch(
  "/:pid",
  [
    check("title").not().isEmpty().isLength({ min: 5 }),
    check("description").not().isEmpty().isLength({ min: 5 }),
  ],
  updateAPosts
);

router.patch("/:id/likePost", likePost);

router.delete("/:pid", deleteAPosts);

export default router;
