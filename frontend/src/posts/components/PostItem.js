import React from "react";
import Card from "../../shared/components/UIElements/Card";
import "./PostItem.css";
import Button from "../../shared/components/FormElements/Button";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import moment from "moment";
import { useDispatch } from "react-redux";
import { likePost } from "../../redux/actions/postAction";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";

const PostItem = (props) => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (props.likes?.length > 0) {
      return props.likes.find((like) => like === user?.userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {props.likes.length > 2
            ? `You and ${props.likes.length - 1} others`
            : `${props.likes.length} like${props.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{props.likes.length}{" "}
          {props.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <li className="post-item">
      <Card className="post-item__content">
        <div className="post-item__image">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="post-item__info">
          <h2>{props.name}</h2>
          <p>{moment(props.createdAt).fromNow()}</p>
          <h2>{props.title}</h2>
          <p>{props.description}</p>
          <p>{props.tags?.map((tag) => `#${tag} `)}</p>
        </div>
        <div className="post-item__actions">
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(likePost(props.id))}
          >
            <Likes />
          </Button>
        </div>
      </Card>
    </li>
  );
};

export default PostItem;
