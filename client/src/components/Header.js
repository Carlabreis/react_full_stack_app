import React from "react";
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <NavLink to="/" end>Courses</NavLink>
        </h1>
        <nav>
          <ul className="header--signedout">
            <li>
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
            <li>
              <NavLink to="/signin">Sign In</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;