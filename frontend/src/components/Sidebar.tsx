// import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

function SideBar(): JSX.Element {

  // const navigate = useNavigate();

  return (
    <div className="relative flex flex-col h-full w-1/4 p-5">
      <div className="w-full h-full"></div>
      <Nav />
    </div>
  );
}

export default SideBar;
