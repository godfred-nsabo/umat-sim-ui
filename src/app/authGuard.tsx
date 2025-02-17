import React from "react";
import { Navigate } from "react-router-dom";

interface AuthGuardProps {
  isAuthenticated?: boolean;
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ isAuthenticated, children }) => {
  const token = localStorage.getItem("token");
  isAuthenticated = isAuthenticated ?? !!token;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
