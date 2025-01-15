import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    auth();
  });

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    
    try {
      const res = await api.post("token/refresh/", { refresh: refreshToken });

      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

    } catch {
      console.error("Error refreshing token");
      setIsAuthenticated(false);
    }

  }

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    const decoded = jwtDecode(token);
    const exp: number | undefined = decoded.exp;
    const currentTime = Date.now() / 1000;

    if (exp === undefined) {
      setIsAuthenticated(false);
      return;
    }

    if (exp < currentTime) {
      await refreshToken();
    } else {
      setIsAuthenticated(true);
    }

  }

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;

}

export default ProtectedRoute;
