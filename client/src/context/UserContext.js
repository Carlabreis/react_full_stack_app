import { createContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [authUser, setAuthUser] = useState(null);

  const signInUser = async (emailAddress, password) => {
    const user = {
      emailAddress,
      password
    };
    setAuthUser(user);
  };

  const signOutUser = () => {
    setAuthUser(null);
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
