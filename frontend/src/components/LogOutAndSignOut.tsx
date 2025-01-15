import { Navigate } from "react-router-dom";

function LogOutAndSingIn() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

export default LogOutAndSingIn;