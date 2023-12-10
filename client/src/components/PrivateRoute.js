import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
    const { authUser } = useContext(UserContext);
    const location = useLocation();

    if (authUser) {
        return <Outlet /> //tell us to render the route nested child in app.js
    } else {
        return <Navigate to="/signin" state={{from: location.pathname}} />
    }
}

export default PrivateRoute;