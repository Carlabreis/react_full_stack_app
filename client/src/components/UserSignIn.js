import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorsDisplay from "./ErrorsDisplay";
import UserContext from "../context/UserContext";

const UserSignIn = () => {
  const { actions } = useContext(UserContext);

  const navigate = useNavigate();

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

    // the btoa method creates a base64 encoded ascii string from a string of data; separate them by a :
    const encodedCredentials = btoa(
      `${emailAddress.current.value}:${password.current.value}`
    );

    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users",
        fetchOptions
      );

      if (response.status === 200) {
        const newUser = await response.json();
        actions.signIn(newUser.emailAddress, newUser.password);
        navigate("/");
        console.log(`${newUser.emailAddress} is now signed in!`);
      } else if (response.status === 401) {
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
          <input
            id="password"
            name="password"
            type="password"
            ref={password}
          />

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
