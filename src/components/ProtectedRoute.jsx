import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // role mismatch
  if (role && role !== userRole) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
