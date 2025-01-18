import { Navigate } from "react-router-dom";

function LogOut(): JSX.Element {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function LogOutAndSingIn(): JSX.Element {
  localStorage.clear();
  return <Navigate to="/login" />;
}

export { LogOutAndSingIn };
export default LogOut;