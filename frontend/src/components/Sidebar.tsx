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
  ThemeIcon,
} from "./SVGIcons";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import axios from "axios";

function SideBar(): JSX.Element {
  const navigate = useNavigate();

  const [subject, setSubject] = useState<string>("");

  const [currentTab, setCurrentTab] = useState<boolean[]>([
    true,
    false,
    false,
    false,
  ]);
  const [lastTab, setLastTab] = useState<number>(0);
  const [tabIndicator, setTabIndicator] = useState<boolean>(true);
  const [searchResults, setSearchResults] = useState<object | null>(null);

  const cancelSearch = ():void => {
    switch (lastTab) {
      case 0:
        setCurrentTab([true, false, false, false]);
        break;
      case 1:
        setCurrentTab([false, true, false, false]);
        break;
      case 2:
        setCurrentTab([false, false, true, false]);
        break;
      default:
        return;
    }
    setTabIndicator(true);
    setSearchResults(null);
  };

  const changeSidebar = async (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FocusEvent<HTMLInputElement>
  ): Promise<void> => {
    event.preventDefault();

    let tab: number = -1;
    let last: number = -1;

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

        if (currentTab[0]) last = 0;
        if (currentTab[1]) last = 1;
        if (currentTab[2]) last = 2;
        
        if (currentTab[3]) break;

        setLastTab(last);
        setTabIndicator(false);

        break;
      default:
        return;
    }

    console.log(tab);

    if (currentTab[tab] || tab === -1) return;

    setCurrentTab([false, false, false, false]);

    // delay for the animation to finish
    await new Promise((resolve) => setTimeout(resolve, 500));

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
        // refreshToken 

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
        cancelSearch={cancelSearch}
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
          } flex flex-col gap-2 items-start px-5`}
        >
          <h1 className="">Settings</h1>
          <button
            className="flex gap-2 items-center"
            onClick={() => navigate("/u/123")}
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
            onClick={() => navigate("/theme")}
          >
            <ThemeIcon /> <h1>Theme</h1>
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
          ${
            currentTab[3] ? "-translate-x-0" : "-translate-x-[110%]"
          } overflow-auto hide-scrollbar`}
        >
          {
            searchResults ? (
              Object.keys(searchResults).map((key) => (
                <ConvoBox key={key} />
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
