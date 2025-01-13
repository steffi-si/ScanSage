import { Navigate } from "react-router-dom";
import { useAuth } from "./context/useAuthContext";

 function PrivateRoute({ children, allowedRoles }) {
  const { isLoggedIn, role } = useAuth();


  if (!isLoggedIn) {
    console.log("Redirecting to login - not logged in");
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    console.log("Redirecting to features - role not allowed");
    return <Navigate to="/features" replace />;
  }
  return children;
}

export default PrivateRoute;