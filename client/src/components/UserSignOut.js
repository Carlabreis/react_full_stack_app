// import React from "react";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

import UserContext from "../context/UserContext";

// signs out the authenticated user and redirects the user to the default route (i.e. the list of courses).
const UserSignOut = () => {
    const { actions } = useContext(UserContext);

    useEffect(() => actions.signOut());
    
    // navigate to root route and replace to prevent loop if user try to navigate history stack
    return <Navigate to="/" replace />
}

export default UserSignOut;