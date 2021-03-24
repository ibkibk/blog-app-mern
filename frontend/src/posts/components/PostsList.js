import React from "react";
import PostItem from "./PostItem";
import "./PostsList.css";
import { Grid, CircularProgress } from "@material-ui/core";

const PostsList = (props) => {
  return !props.items.length ? (
    <Grid container alignItems="center" justify="center">
      <CircularProgress color="primary" style={{ marginTop: "100px" }} />
    </Grid>
  ) : (
    <ul className="post-list">
      {props.items?.map((post) => (
        <PostItem
          setCurrentId={props.setCurrentId}
          key={post._id}
          id={post._id}
          name={post.name}
          image={post.image}
          title={post.title}
          tags={post.tags}
          description={post.description}
          createdAt={post.createdAt}
          likes={post.likes}
          creator={post.creator}
        />
      ))}
    </ul>
  );
};

export default PostsList;
