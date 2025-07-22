import React, { useEffect, useState, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";

// Utilitas parsing dan validasi JWT
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function isTokenValid(token) {
  if (!token) return false;
  const decoded = parseJwt(token);
  if (!decoded || !decoded.exp) return false;

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp > currentTime;
}

function clearAuthData() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
}

// Komponen PrivateRoute
const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const [isValid, setIsValid] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const timerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!isTokenValid(token)) {
        clearAuthData();
        alert("Token invalid or expired. Please login again.");
        setRedirect(true);
        setIsValid(false);
        return;
      }

      const decoded = parseJwt(token);

      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded?.role_id)) {
        alert("You are not authorized to access this page.");
        setRedirect(true);
        setIsValid(false);
        return;
      }

      const currentTime = Math.floor(Date.now() / 1000);
      const timeout = (decoded.exp - currentTime) * 1000;

      timerRef.current = setTimeout(() => {
        clearAuthData();
        alert("Token expired. You will be logged out.");
        setRedirect(true);
        setIsValid(false);
      }, timeout);

      setIsValid(true);
    };

    checkToken();
    return () => clearTimeout(timerRef.current);
  }, [allowedRoles]);

  if (redirect) return <Navigate to="/" state={{ from: location }} replace />;
  if (isValid === null) return <div>Loading...</div>;

  return isValid ? children : null;
};

export default PrivateRoute;
