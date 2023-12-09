// import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";

// signs out the authenticated user and redirects the user to the default route (i.e. the list of courses).
const UserSignOut = () => {
    const navigate = useNavigate();

    const { actions, authUser } = useContext(UserContext);

    actions.signOut(authUser);
    navigate('/');
}

export default UserSignOut;