import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { addRequest, removeRequest, isInRequests } from "../state/Relationships/FriendRequest";
import { isInFriends } from "../state/Relationships/Friends";

import { useNavigate } from "react-router-dom";
import pfp from "../temp/pfp.png";

import { AddFrientIcon, MessageIcon, PenddingIcon } from "./SVGIcons";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);
  const isFriend = useSelector((state: RootState) => state.friends);
  const isFriendRequest = useSelector((state: RootState) => state.friendRequests);

  const [areFriends] = useState<boolean>(isInFriends(isFriend, userID));
  const [isFriendRequestSent, setIsFriendRequestSent] = useState<boolean>(isInRequests(isFriendRequest, userID));

  if (user?.id === userID || user.name === username) {
    return null;
  }

  return (
    <>
      <div
        className="w-full h-fit flex flex-row items-center gap-3 px-3 py-2 bg-white rounded-2xl shadow-md border border-gray-950"
      >
        <img
          src={pfp}
          alt="pfp"
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          onClick={() => navigate(`/u/${userID}`)}
        />
        <h1 className=" min-w-10 max-w-10 text-sm font-azert font-semibold cursor-pointer"
          onClick={() => navigate(`/u/${userID}`)}
        >
          {username.length > 10 ? username.substring(0, 7) + "..." : username}
        </h1>
        <div className="ml-auto z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary cursor-pointer"
          onClick={() => {

            if (areFriends) {
              navigate(`/u/${userID}`);
              return;
            }

            if (isFriendRequestSent) {
              dispatch(removeRequest(userID));
            } else {
              dispatch(addRequest(userID));
            }
            
            setIsFriendRequestSent(isInRequests(isFriendRequest, userID));
            console.log(isInRequests(isFriendRequest, userID));
          }}
        >
          {username === user.name ? null : (areFriends ? <MessageIcon/> : (isFriendRequestSent ? <PenddingIcon /> : <AddFrientIcon />))}
        </div>
      </div>
    </>
  );
}

export default SearchResult;
