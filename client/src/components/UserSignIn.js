import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import ErrorsDisplay from "./ErrorsDisplay";
import UserContext from "../context/UserContext";

const UserSignIn = () => {
  const { actions, authUser } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  // State
  const emailAddress = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  // Event handlers
  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // routing the user to the page they tried to access
    let from = "/";
    if (location.state) {
      from = location.state.from;
    }


    try {
      await actions.signIn(emailAddress.current.value, password.current.value);

      if (authUser) {
        navigate(from);
        // console.log(`${user.emailAddress} is now signed in!`);
        console.log(authUser);
      } else if (authUser === null) {
        setErrors(["Sign-in was unsuccessful!"]);
        console.log("Sign in was unsuccessful!");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        <ErrorsDisplay errors={errors} />
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            ref={emailAddress}
          />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" ref={password} />

          <button className="button" type="submit">
            Sign In
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
        <p>
          Don't have a user account? Click here to{" "}
          <Link to="/signup">sign up</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignIn;
