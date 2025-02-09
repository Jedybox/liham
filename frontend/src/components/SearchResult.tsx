import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useNavigate } from "react-router-dom";
import pfp from "../temp/pfp.png";

import { AddFrientIcon } from "./SVGIcons";

interface SearchResultProps {
  username: string;
  isFriend: boolean;
  userID: string;
}

function SearchResult({
  username,
  /*isFriend,*/ userID,
}: SearchResultProps): JSX.Element | null {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);

  if (user?.id === userID) {
    return null;
  }

  return (
    <>
      <div
        className="w-full h-fit flex flex-row items-center gap-3 px-3 py-2 bg-white rounded-2xl shadow-md cursor-pointer border border-gray-950"
        onClick={() => navigate(`/u/${userID}`)}
      >
        <img
          src={pfp}
          alt="pfp"
          className="w-14 h-14 rounded-full object-cover"
        />
        <h1 className=" min-w-10 max-w-10 text-lg font-azert font-semibold">
          {username.length > 10 ? username.substring(0, 7) + "..." : username}
        </h1>
        <div className="ml-auto">
          <AddFrientIcon />
        </div>
      </div>
    </>
  );
}

export default SearchResult;
