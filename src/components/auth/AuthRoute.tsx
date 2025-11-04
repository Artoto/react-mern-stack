import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = localStorage.getItem("access_token") ?? "";
  if (!isAuthenticated) {
    return children ? children : <Navigate to="/" replace />;
  }

  return <Navigate to="/users" replace />;
};

export default ProtectedRoute;
