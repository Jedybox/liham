import { Navigate } from "react-router-dom";

function Logout(): JSX.Element {
  localStorage.clear();
  return <Navigate to="/login" />;
}

export default Logout;