import { useState } from "react";

import Switch from "../../components/Switch";

function UserPreferences() {
  const [notifAllowed, setNotifAllowed] = useState<boolean>(false);
  const [selectionFocus, setSelectionFocus] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-16 w-full h-full bg-subpage rounded-2xl shadow-subpageshadow text-black relative p-6 font-azert font-bold">
      <header>
        <h1 className="text-5xl font-azert">User Preferences</h1>
      </header>
      <section className="text-lg">
        <div className="flex flex-row items-center gap-12 mb-10">
          <label htmlFor="themes">Theme</label>

          <div className="w-1/4 h-fit relative flex flex-row items-center">
            <select
              name="themes"
              id="themes"
              className="block w-full p-1 px-5 rounded-xl appearance-none focus:outline-none focus:ring-primary"
              onFocus={() => setSelectionFocus(true)}
              onBlur={() => setSelectionFocus(false)}
            >
              <option value="system">System default</option>
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
            <svg
              className={`absolute right-0 mr-3 transition-transform ${selectionFocus ? "rotate-180" : ""} ease-in-out duration-300`}
              width="22"
              height="19"
              viewBox="0 0 28 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.3301 22.5C16.4056 25.8333 11.5944 25.8333 9.66987 22.5L1.00962 7.50001C-0.914881 4.16667 1.49074 0 5.33974 0H22.6602C26.5092 0 28.9149 4.16667 26.9904 7.5L18.3301 22.5Z"
                fill="black"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-row gap-5">
          <h3>Notifications</h3>
          <Switch
            isOn={notifAllowed}
            handleToggle={() => setNotifAllowed(!notifAllowed)}
          />
        </div>
      </section>
    </div>
  );
}

export default UserPreferences;
