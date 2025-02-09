import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Nav from "./Nav";
import SearchBar from "./SearchBar";
import ConvoBox from "./ConvoBox";
import api from "../api";
import {
  AccountIcon,
  BulbIcon,
  InfoIcon,
  PreferencesIcon,
  PrivacyIcon,
} from "./SVGIcons";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import axios from "axios";
import SearchResult from "./SearchResult";

import { useSelector } from "react-redux";
import { RootState } from "../state/store";

function SideBar(): JSX.Element {
  const user = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  const [subject, setSubject] = useState<string>("");

  const [currentTab, setCurrentTab] = useState<boolean[]>([
    true,
    false,
    false,
    false,
  ]);

  const [tabIndicator, setTabIndicator] = useState<boolean>(true);
  interface SearchResultType {
    [key: string]: {
      username: string;
      is_friend: boolean;
      id: number;
    };
  }

  const [searchResults, setSearchResults] = useState<SearchResultType | null>(null);

  const changeSidebar = async (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FocusEvent<HTMLInputElement>
  ): Promise<void> => {
    event.preventDefault();

    let tab: number = -1;

    switch (event.currentTarget.id) {
      case "message":
        tab = 0;
        break;
      case "notif":
        tab = 1;
        break;
      case "settings":
        tab = 2;
        break;
      case "search":
        tab = 3;
        setTabIndicator(false);
        break;
      default:
        return;
    }

    if (tab !== 3) setTabIndicator(true);

    if (currentTab[tab] || tab === -1) return;

    setCurrentTab([false, false, false, false]);

    // delay for the animation to finish
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (tab !== 3) setSearchResults(null);
    
    switch (tab) {
      case 0:
        setCurrentTab([true, false, false, false]);
        break;
      case 1:
        setCurrentTab([false, true, false, false]);
        break;
      case 2:
        setCurrentTab([false, false, true, false]);
        break;
      case 3:
        setCurrentTab([false, false, false, true]);
        break;
      default:
        return;
    }

  };

  const search = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (subject.length === 0 || subject.trim() === "") return;

    try {
      const response = await api.get("/user/search/", {
        params: {
          query: subject,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      });

      setSearchResults(response.data);
      
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {

        const refresh = localStorage.getItem(REFRESH_TOKEN);

        if (!refresh) {
          navigate("/login");
          return;
        }

        const res = await api.post("/token/refresh/", { refresh });

        if (res.status === 200) {
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          search(event);
        } else {
          navigate("/login");
        }
      }

      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setSearchResults(null);
      }
    }
  };

  return (
    <aside className="relative flex flex-col h-full w-1/4 p-5 gap-2">
      <SearchBar
        changeTab={(e: React.FocusEvent<HTMLInputElement>) => changeSidebar(e)}
        subject={subject}
        onChangeSubject={setSubject}
        search={search}
      />
      <div className="relative w-full h-full">
        <div
          className={`absolute transition-all ease-in-out duration-500 w-full h-full 
          ${
            currentTab[0] ? "-translate-x-0" : "-translate-x-[110%]"
          } flex flex-col gap-2 overflow-auto hide-scrollbar`}
        >
          <ConvoBox />
        </div>
        <div
          className={`absolute transition-all ease-in-out duration-500 w-full h-2 bg-primary 
          ${currentTab[1] ? "-translate-x-0" : "-translate-x-[110%]"}`}
        >
          notf
        </div>
        <div
          className={`absolute transition-all ease-in-out duration-500 w-full h-full bg-primary 
          ${
            currentTab[2] ? "-translate-x-0" : "-translate-x-[110%]"
          } flex flex-col gap-2 items-start px-5 rounded-lg overflow-auto hide-scrollbar`}
        >
          <h1 className="text-2xl">Settings</h1>
          <button
            className="flex gap-2 items-center"
            onClick={() => navigate(`/u/${user.id}`)}
          >
            <AccountIcon /> <h1>Account</h1>
          </button>
          <button
            className="flex gap-2 items-center"
            onClick={() => navigate("/privacy")}
          >
            <PrivacyIcon /> <h1>Privacy</h1>
          </button>
          <button
            className="flex gap-2 items-center"
            onClick={() => navigate("/preferences")}
          >
            <PreferencesIcon /> <h1>Preferences</h1>
          </button>
          <button
            className="flex gap-2 items-center"
            onClick={() => navigate("/learn")}
          >
            <BulbIcon /> <h1>Learn</h1>
          </button>
          <button
            className="flex gap-2 items-center"
            onClick={() => navigate("/about")}
          >
            <InfoIcon /> <h1>About</h1>
          </button>
        </div>
        <div
          className={`absolute transition-all ease-in-out duration-500 w-full h-full
          ${currentTab[3] ? "opacity-100" : "opacity-0 pointer-events-none"}
           overflow-auto hide-scrollbar gap-3 flex flex-col items-start`}
        >
          {
            searchResults ? (
              Object.keys(searchResults).map((key) => (
                <SearchResult
                  key={key}
                  username={searchResults[key].username}
                  isFriend={searchResults[key].is_friend}
                  userID={searchResults[key].id.toString()}
                />
              ))
            ) : (
              <h1>No results found</h1>
            )
          }
        </div>
      </div>
      <Nav tabIndicator={tabIndicator} changebar={changeSidebar} />
    </aside>
  );
}

export default SideBar;
