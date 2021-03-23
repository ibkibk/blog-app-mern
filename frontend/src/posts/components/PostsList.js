import React from "react";

import Card from "../../shared/components/UIElements/Card";
import PostItem from "./PostItem";
import "./PostsList.css";

const PostsList = (props) => {
  if (props.items?.length === 0) {
    return (
      <div className="post-list center">
        <Card>
          <h2>No post found. Maybe create one?</h2>
          <button to="/login">Share Post</button>
        </Card>
      </div>
    );
  }

  return (
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
