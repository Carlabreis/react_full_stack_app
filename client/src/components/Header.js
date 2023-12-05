import React from "react";

const Header = () => {
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <a href="/">Courses</a>
        </h1>
        <nav>
          <ul className="header--signedout">
            <li>
              <a href="/UserSignUp">Sign Up</a>
            </li>
            <li>
              <a href="/UserSignIn">Sign In</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;