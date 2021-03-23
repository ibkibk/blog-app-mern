import { combineReducers } from "redux";
import posts from "./postReducer";
import auth from "./authReducer";

export default combineReducers({
  posts,
  auth,
});
