import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useNavigate } from "react-router-dom";
import pfp from "../temp/pfp.png";

import { AddFrientIcon, PenddingIcon } from "./SVGIcons";
import { useState } from "react";

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

  const [sentFriendRequest, setSentFriendRequest] = useState<boolean>(false);

  if (user?.id === userID) {
    return null;
  }

  return (
    <>
      <div
        className="w-full h-fit flex flex-row items-center gap-3 px-3 py-2 bg-white rounded-2xl shadow-md cursor-pointer border border-gray-950"
      >
        <img
          src={pfp}
          alt="pfp"
          className="w-10 h-10 rounded-full object-cover"
          onClick={() => navigate(`/u/${userID}`)}
        />
        <h1 className=" min-w-10 max-w-10 text-sm font-azert font-semibold"
          onClick={() => navigate(`/u/${userID}`)}
        >
          {username.length > 10 ? username.substring(0, 7) + "..." : username}
        </h1>
        <div className="ml-auto z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary"
          onClick={() => {
            setSentFriendRequest(!sentFriendRequest);
          }}
        >
          {sentFriendRequest? <PenddingIcon/> :  <AddFrientIcon />}
        </div>
      </div>
    </>
  );
}

export default SearchResult;
