import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../state/User/User";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);

        if (!token) {
          setIsAuthenticated(false);
          return;
        }

        const decoded: { exp: number } = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          await refreshToken();
        } else {
          setIsAuthenticated(true);
        }

        const res = await api.get(
          "/user/me/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        if (res.status === 200) {
          dispatch(
            setUser({
              id: res.data.id,
              name: res.data.user,
              email: res.data.email,
              image: res.data.image,
            })
          );
        }

        console.log(res)

        console.log("User name:", user.name);

      } catch (error) {
        console.error("Authentication error:", error);
        setIsAuthenticated(false);
      }
    };

    authenticate();
  }, []);

  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem(REFRESH_TOKEN);

      if (!refresh) {
        setIsAuthenticated(false);
        return;
      }

      const res = await api.post("/token/refresh/", { refresh });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default ProtectedRoute;
