import React from "react";
import PostsList from "../components/PostsList";
import { useSelector } from "react-redux";

const Posts = (props) => {
  const POSTS = useSelector((state) => state.posts);
  return <PostsList items={POSTS} setCurrentId={props.setCurrentId} />;
};

export default Posts;
