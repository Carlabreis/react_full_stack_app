import { createContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  const signInUser = async (emailAddress, password) => {
    const newUser = {
      emailAddress,
      password
    };
    setUser(newUser);
  };

  const signOutUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
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
