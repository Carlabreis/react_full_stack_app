import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import UserContext from "../context/UserContext";

/**
 * If user are not signed in, it renders the "sign up" and "sign in" links.
 * If user is signed in, it renders a "Welcome user" message and a "sign out" link.
 * 
 * @returns header component
 */
const Header = () => {
  const { authUser } = useContext(UserContext);

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <NavLink to="/" end>
            Courses
          </NavLink>
        </h1>
        <nav>
          {authUser === null ? (
            <ul className="header--signedout">
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
              <li>
                <NavLink to="/signin">Sign In</NavLink>
              </li>
            </ul>
          ) : (
            <ul className="header--signedin">
              <span>Welcome {authUser.firstName}</span>
              <li>
                <NavLink to="/signout">Sign Out</NavLink>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
