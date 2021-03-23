import PostMessage from "../models/PostModel.js";
import User from "../models/UserModel.js";
import mongoose from "mongoose";
import asyncHandler from "../middlewares/async.js";
import HttpError from "../middlewares/httpError.js";
import validator from "express-validator";
// import fs from "fs";
const { validationResult } = validator;

export const getAllPosts = asyncHandler(async (req, res, next) => {
  const allPosts = await PostMessage.find();
  if (!allPosts) {
    return next(new HttpError("Could not find any post"));
  }
  res.status(200).json(allPosts);
});

export const getAPost = asyncHandler(async (req, res, next) => {
  const postbyId = await PostMessage.findById(req.params.pid);
  if (!postbyId) {
    return next(new HttpError("Could not find a post"));
  }
  res.status(200).json(postbyId);
});

export const getPostsByUserIdPost = asyncHandler(async (req, res, next) => {
  const userId = req.params.uid;
  const userWithPost = await User.findById(userId).populate("posts");

  if (!userWithPost || userWithPost.posts.length === 0) {
    return next(
      new HttpError("Could not find places for the provided user id.", 404)
    );
  }
  res.status(200).json(userWithPost);
});

export const createAPosts = asyncHandler(async (req, res, next) => {
  console.log(req.file);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("invalid inputs please check you data", 422));
  }

  try {
    const { title, description, tags, image, creator, name } = req.body;
    // console.log(req.body);
    // console.log(req.file);
    // if (!req.file) return res.send("Please upload a file");
    const createdPost = new PostMessage({
      name,
      title,
      description,
      tags,
      image,
      // image: req.file.path,
      creator,
      createdAt: new Date().toISOString(),
    });

    let user = await User.findById(creator);

    if (!user) {
      const error = new HttpError("Could not find user for provided id", 404);
      return next(error);
    }

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPost.save({ session: sess });
    user.posts.push(createdPost);
    await user.save({ session: sess });
    await sess.commitTransaction();

    res.status(201).json(createdPost);
  } catch (error) {
    res.status(404).json(error);
    console.log(error);
  }
});

export const updateAPosts = asyncHandler(async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return next(new HttpError("invalid inputs please check you data", 422));
    }

    const postId = req.params.pid;
    const { title, description } = req.body;
    const updatePost = await PostMessage.findById(postId);

    if (updatePost.creator.toString() !== req.userData.userId) {
      const error = new HttpError(
        "You are not allowed to edit this post.",
        401
      );
      return next(error);
    }
    updatePost.title = title;
    updatePost.description = description;
    await updatePost.save();
    res.status(200).json(updatePost);
  } catch (error) {
    res.status(404).json(error);
  }
});

export const deleteAPosts = asyncHandler(async (req, res, next) => {
  const postId = req.params.pid;

  let post = await PostMessage.findById(postId).populate("creator");

  if (!post) {
    const error = new HttpError("Could not find post for this id.", 404);
    return next(error);
  }
  // const imagePath = place.image;

  const sess = await mongoose.startSession();
  sess.startTransaction();
  await post.remove({ session: sess });
  post.creator.posts.pull(post);
  await post.creator.save({ session: sess });
  await sess.commitTransaction();

  // fs.unlink(imagePath, (err) => {
  //   console.log(err);
  // });

  res.status(200).json({ message: "post has been deleted." });
});

export const likePost = async (req, res) => {
  const { id } = req.params;
  // console.log(req);

  if (!req.userData.userId) {
    console.log(req.userData.userId);
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex(
    (id) => id === String(req.userData.userId)
  );

  if (index === -1) {
    post.likes.push(req.userData.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userData.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};
