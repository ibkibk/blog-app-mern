import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import postsRoutes from "./routes/postsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

const app = express();

dotenv.config({ path: "../config.env" });

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use("/posts", postsRoutes);
app.use("/users", usersRoutes);

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
