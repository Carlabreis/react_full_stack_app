import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ErrorsDisplay from "./ErrorsDisplay";
import { api } from "../utils/apiHelper";
import UserContext from "../context/UserContext";

/**
 * This component provides the "Sign Up" screen by rendering a form that allows a user to sign up by creating a new account.
 * The component also renders a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user.
 * This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).
 * 
 * @returns UserSignUp component
 */

const UserSignUp = () => {
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();

  // STATE
  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  // EVENT HANDLERS
  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: emailAddress.current.value,
      password: password.current.value,
    };

    const credentials = {
      emailAddress: user.emailAddress,
      password: user.password
    }

    try {
      const response = await api(
        "/users",
        'POST',
        user
      );

      if (response.status === 201) {
        const user = await actions.signIn(credentials);
        console.log(
          `${user.firstName} is successfully signed up and authenticated!`
        );
        navigate("/");
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors);
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
        <h2>Sign Up</h2>
        <ErrorsDisplay errors={errors} />
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" ref={firstName} />

          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" ref={lastName} />

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
            Sign Up
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
        <p>
          Already have a user account? Click here to{" "}
          <Link to="/signin">sign in</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignUp;
