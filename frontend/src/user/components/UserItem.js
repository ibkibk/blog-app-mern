import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
// import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import "./UserItem.css";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { deletePost } from "../../redux/actions/postAction";
import { useHistory } from "react-router-dom";
// import { signin, signup } from "../../redux/actions/authAction";

const user = JSON.parse(localStorage.getItem("profile"));
console.log(user);

const UserItem = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userPost = useSelector((state) =>
    state.posts.filter((post) => post?.creator === user?.userId)
  );
  console.log(userPost);

  const handleEdit = () => {
    history.push("/posts/new");
  };

  return (
    <li className="user-item">
      <Card className="user-item__content">
        <div className="user-item__info">
          {/* <div className="user-item__image">
              <Avatar image={user.image} alt={user.name} />
            </div> */}
          <h2>{user?.name}</h2>
          <h3 style={{ marginBottom: "20px" }}>{user?.email}</h3>
          <Button>Update</Button>
          <h3 style={{ marginTop: "20px" }}></h3>
        </div>
      </Card>
      <h3 style={{ marginTop: "20px", textAlign: "center" }}>
        {userPost.length} {userPost.length === 1 ? "Post" : "Posts"}
      </h3>
      <Card className="user-item__content">
        {userPost.map((item) => {
          return (
            <div style={{ marginBottom: "20px" }}>
              <div className="place-item__image">
                <img src={item.image} alt={item.title} />
              </div>{" "}
              <div className="place-item__info">
                <h2>{item.name}</h2>
                <p>{moment(item.createdAt).fromNow()}</p>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p>{item.tags?.map((tag) => `#${tag} `)}</p>
              </div>
              <div className="place-item__actions">
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
