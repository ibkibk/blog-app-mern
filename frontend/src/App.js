import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Posts from "./posts/pages/Posts";
import { useDispatch } from "react-redux";
import { getPosts } from "./redux/actions/postAction";
import NewPost from "./posts/pages/NewPost";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Login from "./user/pages/Login";
import UserItem from "./user/components/UserItem";

const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/user/profile" exact>
            {/* <Users /> */}
            <UserItem setCurrentId={setCurrentId} />
          </Route>
          <Route path="/" exact>
            <Posts setCurrentId={setCurrentId} />
          </Route>
          {/* <Route path="/:userId/posts" exact>
            <UserPosts />
          </Route> */}

          <Route path="/posts/new" exact>
            <NewPost currentId={currentId} setCurrentId={setCurrentId} />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
