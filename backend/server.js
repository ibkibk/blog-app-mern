import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import postsRoutes from "./routes/postsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
// import fs from "fs";
// import path from "path";
const app = express();

dotenv.config({ path: "../config.env" });

app.use(cors({ origin: true }));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/posts", postsRoutes);
app.use("/users", usersRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

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
