import React, { useEffect, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import "./UserItem.css";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { deletePost } from "../../redux/actions/postAction";
import { editProfile } from "../../redux/actions/authAction";
import FileBase from "react-file-base64";
import { useHistory } from "react-router-dom";
import { TextField, Typography, Paper } from "@material-ui/core";
import useStyles from "../../posts/pages/styles";

const user = JSON.parse(localStorage.getItem("profile"));
const UserItem = (props) => {
  const [message, setMessage] = useState(null);

  const [userData, setUserData] = useState({
    name: user?.name,
    email: user?.email,
    image: user?.image,
    password: user?.password,
    confirmPassword: user?.confirmPassword,
  });

  const history = useHistory();
  const classes = useStyles();

  const dispatch = useDispatch();

  const userPost = useSelector((state) =>
    state.posts.filter((post) => post?.creator === user?.userId)
  );

  useEffect(() => {
    if (user.userId) {
      dispatch(
        editProfile({
          ...userData,
          _id: user.userId,
          token: user.token,
        })
      );
    }
  }, [dispatch, userData]);

  const handleEdit = () => {
    history.push("/posts/new");
  };

  const userEditHandler = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        editProfile({
          ...userData,
          _id: user.userId,
          token: user.token,
        })
      );
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <li className="user-item">
      <Paper className="user-item__content">
        <form autoComplete="off" className={`${classes.root} ${classes.form}`}>
          <Typography variant="h6">Edit user info </Typography>

          <div className="user-item__info">
            <div className="user-item__image">
              <Avatar image={userData.image} alt={user?.name} />
            </div>
            <div className={classes.fileInputs}>
              <FileBase
                style={{ marginBottom: "20px" }}
                id="image"
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setUserData({ ...userData, image: base64 })
                }
              />
            </div>
            <TextField
              name="name"
              required
              variant="outlined"
              label="Name"
              fullWidth
              onChange={handleChange}
              value={userData.name}
            />

            <TextField
              name="email"
              required
              variant="outlined"
              label="Email"
              fullWidth
              onChange={handleChange}
              value={userData.email}
            />

            <TextField
              name="password"
              required
              variant="outlined"
              label="Password"
              fullWidth
              type="password"
              style={{ marginTop: "20px" }}
              onChange={handleChange}
              value={userData.password}
            />
            <TextField
              name="confirmPassword"
              required
              variant="outlined"
              label="Confirm Password"
              fullWidth
              type="password"
              style={{ marginTop: "20px" }}
              onChange={handleChange}
              value={userData.confirmPassword}
            />

            <Button onClick={userEditHandler}>Update</Button>
          </div>
        </form>
      </Paper>
      <h3 style={{ marginTop: "20px", textAlign: "center" }}>
        {userPost.length} {userPost.length === 1 ? "Post" : "Posts"}
      </h3>
      <Card className="user-item__content">
        {userPost.map((item) => {
          return (
            <div style={{ marginBottom: "20px" }} key={item._id}>
              <div className="post-item__image">
                <img src={item.image} alt={item.title} />
              </div>{" "}
              <div className="post-item__info">
                <h2>{item.name}</h2>
                <p>{moment(item.createdAt).fromNow()}</p>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p>{item.tags?.map((tag) => `#${tag} `)}</p>
              </div>
              <div className="post-item__actions">
                <div>
                  <Button
                    onClick={() => handleEdit(props.setCurrentId(item._id))}
                  >
                    EDIT
                  </Button>
                  <Button danger onClick={() => dispatch(deletePost(item._id))}>
                    DELETE
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </Card>
    </li>
  );
};

export default UserItem;
