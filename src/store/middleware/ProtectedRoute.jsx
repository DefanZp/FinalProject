import React from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const sessionId = localStorage.getItem("sessionToken");
  const accountId = localStorage.getItem("userId");

  if (!sessionId || !accountId) {
    toast.error("Login Terlebih dahulu");
    return <Navigate to="/login" replace />;
  }

  
  return children;
};

export default ProtectedRoute;