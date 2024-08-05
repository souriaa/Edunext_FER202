import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();

    var count = 0;

    allowedRoles.map((value) => {

        if (localStorage.getItem("role") === value) count++

    })

    return (
        count === 1
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;