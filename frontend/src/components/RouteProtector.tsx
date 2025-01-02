import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState, useEffect } from "react";
import { ReactNode } from "react";

function RouteProtector({ children }: { children: ReactNode }) {
  
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        authenticate().catch(() => setIsAuthenticated(false));
    }, []);

    const refreshToken = async () => {

        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshToken) {
            setIsAuthenticated(false);
            return;
        }

        try {
            const response = await api.post('/api/token/refresh/', {
                refresh: refreshToken,
            });

            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }

        } catch {
            setIsAuthenticated(false);
        }

    }

    const authenticate = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        const decoded = jwtDecode(token);
        const tokenExpired = decoded.exp
        const now = Date.now() / 1000;

        if (tokenExpired && tokenExpired < now) {
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

export default RouteProtector;