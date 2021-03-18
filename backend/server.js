import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import postsRoutes from "./routes/postsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import fs from "fs";
import path from "path";
const app = express();

dotenv.config({ path: "../config.env" });

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use("/posts", postsRoutes);
app.use("/users", usersRoutes);

// app.use((error, req, res, next) => {
//   if (req.file) {
//     fs.unlink(req.file.path, (err) => {
//       console.log(err);
//     });
//   }
//   if (res.headerSent) {
//     return next(error);
//   }
//   res.status(error.code || 500);
//   res.json({ message: error.message || "An unknown error occurred!" });
// });
const DB = process.env.MongoDB;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("database connection successful");
  });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`hello from server on PORT ${PORT}`);
});
