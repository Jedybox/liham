import { useState } from "react";
import { MessageIcon, NotifIcon, SettingsIcon, LogOutIcon } from "./SVGIcons";
import { useNavigate } from "react-router-dom";


export default function Nav() {

    const navigate = useNavigate();

    const [currentTab, setCurrentTab] = useState<string>('left-[10.5px]');

    return (
        <nav className="relative flex flex-row border-black border-[1px] bg-primary shadow-inputfield gap-4 h-fit py-2 px-3 rounded-full align-center">
            <div className={`absolute bg-white w-7 h-7 rounded-full top-[0.35rem] ${currentTab} transition-all ease-in-out duration-5s00`}/>
            <button className="w-fit h-fit rounded-full z-10"
              onClick={() => setCurrentTab('left-[10.5px]')}
            >
              <MessageIcon />
            </button>
            <button className="w-fit h-fit rounded-full z-10"
                onClick={() => setCurrentTab('left-[50px]')}
            >
              <NotifIcon />
            </button>
            <button className="w-fit h-fit rounded-full z-10"
                onClick={() => setCurrentTab('left-[89.5px]')}
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