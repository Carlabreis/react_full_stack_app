import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { api } from "../utils/apiHelper";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const navigate = useNavigate();
  const cookie = Cookies.get("authenticatedUser");
  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

  const signInUser = async (credentials) => {
    const response = await api("/users", "GET", null, credentials);

    if (response.status === 200) {
      const user = await response.json();
      user.password = credentials.password;
      setAuthUser(user);
      // Store authenticated user in Cookies for 1 day
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
      return authUser;
    } else if (response.status === 401) {
      return null;
    } else if (response.status === 500) {
      navigate("/error");
    } else {
      throw new Error();
    }
  };

  const signOutUser = () => {
    setAuthUser(null);
    Cookies.remove("authenticatedUser");
  };

  return (
    <UserContext.Provider
      value={{
        authUser,
        actions: {
          signIn: signInUser,
          signOut: signOutUser,
        },
      }}
    >
      {/* children is a special React prop that lets you pass components as data to other components */}
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
