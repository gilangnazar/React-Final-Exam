import React, { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const timerRef = useRef(null);

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

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!isTokenValid(token)) {
        clearAuthData();
        alert("Token invalid or expired. Please login again.");
        setIsValid(false);
        return;
      }

      const decoded = parseJwt(token);
      const currentTime = Math.floor(Date.now() / 1000);
      const timeout = (decoded.exp - currentTime) * 1000;

      timerRef.current = setTimeout(() => {
        clearAuthData();
        alert("Token expired. You will be logged out.");
        setIsValid(false);
      }, timeout);

      setIsValid(true);
    };

    checkToken();

    return () => clearTimeout(timerRef.current);
  }, []);

  if (isValid === null) return <div>Loading...</div>;
  return isValid ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
