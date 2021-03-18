import React, { useState, useEffect } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import * as actionType from "../../../redux/types/types";

import "./NavLinks.css";

const NavLinks = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push("/auth");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <ul className="nav-links">
      <li>
        {user && (
          <div>
            <NavLink to="/user/profile">Profile</NavLink>
          </div>
        )}
      </li>
      <li>
        <NavLink to="/" exact>
          ALL POSTS
        </NavLink>
      </li>

      {/* <li>{user && <NavLink to="/u1/posts">MY POSTS</NavLink>}</li> */}
      <li>
        <NavLink to="/posts/new">ADD POST</NavLink>
      </li>
      <li>
        {user ? (
          <div>
            <NavLink to="/" onClick={logout}>
              LOGOUT
            </NavLink>
          </div>
        ) : (
          <NavLink to="/login">LOGIN</NavLink>
        )}
      </li>
    </ul>
  );
};

export default NavLinks;
