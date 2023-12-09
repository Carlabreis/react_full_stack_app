import { createContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [authUser, setAuthUser] = useState(null);

  const signInUser = async (emailAddress, password) => {
    // the btoa method creates a base64 encoded ascii string from a string of data; separate them by a :
    const encodedCredentials = btoa(
      `${emailAddress}:${password}`
    );

    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    };

    // try {
      const response = await fetch(
        "http://localhost:5000/api/users",
        fetchOptions
      );

      if (response.status === 200) {
        const user = await response.json();
        user.password = password;
        setAuthUser(user);
        return authUser;
      } 
      // else if (response.status === 401) {
      //   return null;
      // }
    //   else {
    //     throw new Error();
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    // const user = {
    //   emailAddress,
    //   password
    // };
    // setAuthUser(user);
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
