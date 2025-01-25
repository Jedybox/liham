import React, { useState } from "react";
import { MessageIcon, NotifIcon, SettingsIcon, LogOutIcon } from "./SVGIcons";
import { useNavigate } from "react-router-dom";

interface NavProps {
  changebar: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Nav({ changebar } : NavProps) : JSX.Element {

    const navigate = useNavigate();

    const [currentTab, setCurrentTab] = useState<string>('left-[10.5px]');

    return (
        <nav className="relative flex flex-row border-black border-[1px] bg-primary shadow-inputfield gap-4 h-fit py-2 px-3 rounded-full align-center">
            <div className={`absolute bg-white w-7 h-7 rounded-full top-[0.35rem] ${currentTab} transition-all ease-in-out duration-500`}/>
            <button className="w-fit h-fit rounded-full z-10"
              id="message"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                setCurrentTab('left-[10.5px]');
                changebar(e);
              }}
            >
              <MessageIcon />
            </button>
            <button className="w-fit h-fit rounded-full z-10"
                id="notif"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  setCurrentTab('left-[50px]');
                  changebar(e)
                }}
            >
              <NotifIcon />
            </button>
            <button className="w-fit h-fit rounded-full z-10"
                id="settings"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  setCurrentTab('left-[89.5px]');
                  changebar(e);
                }}
            >
              <SettingsIcon />
            </button>

            
            <button 
              onClick={() => navigate("/logout")}
              className="absolute w-fit h-fit right-3 top-[0.55rem]"
            >
              <LogOutIcon />
            </button>
      </nav>
    );
}