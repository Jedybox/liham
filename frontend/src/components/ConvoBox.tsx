import { NavLink } from "react-router-dom";

function ConvoBox() : JSX.Element {
  const styles: string =
    "flex items-center p-2 bg-primaryConvo hover:bg-secondaryConvo rounded-lg";

  return (
    <NavLink
      to="/m/1"
      className={({ isActive }) =>
        isActive ? styles + " bg-secondaryConvo" : styles
      }
    >
      <img
        src="https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/04/62/e6/0462e6b9-45b0-f229-afc0-d2f79cce2cf4/artwork.jpg/1200x1200bf-60.jpg"
        alt="profile"
        className="w-14 h-14 rounded-full"
      />
      <div className="flex flex-col ml-2">
        <span className="font-semibold">John Pork</span>
        <span className="text-sm text-gray-500">You missed a call</span>
      </div>
    </NavLink>
  );
}

export default ConvoBox;
