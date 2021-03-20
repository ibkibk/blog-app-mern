import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updatePost } from "../../redux/actions/postAction";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const NewPost = ({ currentId, setCurrentId }) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    title: "",
    description: "",
    tags: "",
    image: "",
  });

  const posts = useSelector(
    (state) =>
      currentId && state.posts.find((theOne) => theOne._id === currentId)
  );

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (posts) {
      setPostData(posts);
    }
  }, [posts]);

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      description: "",
      tags: "",
      image: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, {
          ...postData,
          token: user.token,
          creator: user.userId,
          name: user.name,
        })
      );
    } else {
      dispatch(
        addPost({
          ...postData,
          token: user.token,
          creator: user.userId,
          name: user.name,
        })
      );
    }
    clear();
    history.push("/");
  };

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  if (!user?.email) {
    return (
      <Paper className={classes.paper}>
        <Typography
          className={classes.sign}
          component={Link}
          to="/login"
          variant="h6"
          align="center"
        >
          Please sign in to post
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Creating a Post</Typography>

        <TextField
          name="title"
          required
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={handleChange}
        />

        <TextField
          name="description"
          required
          variant="outlined"
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={postData.description}
          onChange={handleChange}
        />
        <TextField
          name="tags"
          required
          variant="outlined"
          label="Tags "
          fullWidth
          value={postData.tags}
          onChange={handleChange}
        />
        <div className={classes.fileInput}>
          <FileBase
            id="image"
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, image: base64 })}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default NewPost;
