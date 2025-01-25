// import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Nav from "./Nav";
import SearchBar from "./SearchBar";

function SideBar(): JSX.Element {
  // const navigate = useNavigate();

  const [subject, setSubject] = useState<string>("");

  const [currentTab, setCurrentTab] = useState<boolean[]>([true, false, false, false]);

  const changeSidebar = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FocusEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();

    const id = event.currentTarget.id;

    switch (id) {
      case "message":
        setCurrentTab([true, false, false, false]);
        break;
      case "notif":
        setCurrentTab([false, true, false, false]);
        break;
      case "settings":
        setCurrentTab([false, false, true, false]);
        break;
      case "search":
        setCurrentTab([false, false, false, true]);
        break;
      default:
        break;
    }
  };

  const search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // navigate(`/search/${subject}`);

    alert(`Searching for ${subject}`);
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
          className={`absolute transition-all ease-in-out duration-500 w-full h-full bg-primary 
          ${currentTab[0] ? "-translate-x-0" : "-translate-x-[110%]"}`}
        >
          message
        </div>
        <div
          className={`absolute transition-all ease-in-out duration-500 w-full h-full bg-primary 
          ${currentTab[1] ? "-translate-x-0" : "-translate-x-[110%]"}`}
        >
          notf
        </div>
        <div
          className={`absolute transition-all ease-in-out duration-500 w-full h-full bg-primary 
          ${currentTab[2] ? "-translate-x-0" : "-translate-x-[110%]"}`}
        >
          set
        </div>
        <div className={`absolute transition-all ease-in-out duration-500 w-full h-full bg-primary 
          ${currentTab[3] ? "-translate-x-0" : "-translate-x-[110%]"}`}>
          sear
        </div>
      </div>
      <Nav changebar={changeSidebar} />
    </aside>
  );
}

export default SideBar;
