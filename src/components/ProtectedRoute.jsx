// components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, userRole }) => {
  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
