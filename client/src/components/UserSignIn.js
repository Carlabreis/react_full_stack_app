import { useContext, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import ErrorsDisplay from "./ErrorsDisplay";
import UserContext from "../context/UserContext";

const UserSignIn = () => {
  const { actions } = useContext(UserContext);

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

    const credentials = {
      emailAddress: emailAddress.current.value,
      password: password.current.value,
    };

    try {
      const user = await actions.signIn(credentials);

      if (user) {
        console.log(`${user.firstName} is signed in.`);
        navigate(from);
      } else if (user === null) {
        setErrors(["Sign-in was unsuccessful!"]);
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
            defaultValue=""
          />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" ref={password} defaultValue="" />

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
