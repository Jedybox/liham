import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useEffect, useState } from "react";
import { PenIcon } from "../../components/SVGIcons";

import cover from "../../temp/cover.jpg";
import pfp from "../../temp/pfp.png";
import Switch from "../../components/Switch";

const UserAccount = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);

  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    document.title = "Liham | Account";

    if (!user) {
      console.log("User not logged in");
    }
  }, [user]);

  return (
    <div className="flex flex-col  w-full h-full bg-subpage rounded-2xl shadow-subpageshadow text-black relative">
      <header className="h-1/4 w-full flex items-center justify-center rounded-t-2xl overflow-hidden relative">
        <img
          src={cover}
          alt="cover"
          className="w-full object-cover rounded-t-2xl"
        />
      </header>

      <div className="z-10 flex flex-row items-center -mt-[4.5rem] mx-[6%] w-fit-content">
        {/*Profile Picture*/}
        <div className="z-10 ">
          <img
            src={pfp}
            alt=""
            className="w-36 h-36 rounded-full object-cover border-[3px] border-subpage"
          />
        </div>

        {/*User name*/}
        <div className="text-3xl font-azert font-medium  ml-4 px-3 py-1 bg-subpage rounded-full  tracking-tighter">
          <h1>jhon.box</h1>
        </div>

        {/*Online indicator*/}
        <div
          className={`h-4 w-4 ${
            isOnline ? "bg-isOnline" : "bg-isOffline"
          } rounded-full ml-2`}
        />
      </div>

      <section className="flex flex-row items-center justify-center w-full h-3/5 font-azert bottom-0 relative font-semibold">
        <div className="flex flex-col gap-6 w-[50%] h-full tracking-tighter px-[5%] py-2">
          <div className="w-full h-fit text-base">
            <p>
              <span className="">Email:</span> {user.email} <PenIcon />
            </p>
          </div>

          <div className="w-full h-fit text-base">
            <p>
              {user.bio === "" ? "Bio: " : user.bio}{" "}
              <span>
                <PenIcon />
              </span>
            </p>
          </div>

          <div className=" flex flex-row items-center w-full h-fit mt-auto">
            <h1 className="w-fit text-base font-azert font-semibold tracking-tighter">
              Active visibility
            </h1>
            <Switch isOn={isOnline} handleToggle={() => setIsOnline(!isOnline)} />
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center h-full tracking-tighter pr-10">
          <div className="w-full h-[90%] bg-white rounded-r-2xl rounded-b-2xl relative">
            <div className="absolute -top-6 text-white bg-[#859ede] px-3 rounded-t-xl">
              <h1 className="m-0 p-0">Friends</h1>
            </div>

            {/*List of friends*/}
            <div className="w-full h-fit flex flex-col items-center justify-center tracking-tighter overflow-y-auto">
              <div className="w-full h-fit text-sm flex flex-row items-center p-2 relative">
                <img
                  src={pfp}
                  alt=""
                  className="w-16 h-16 mr-[5%] ml-[5%] object-cover rounded-full"
                />
                <h1 className="font-azert text-lg">kerby</h1>
                <div className="w-fit h-fit absolute float-end right-[5%] flex flex-row items-center justify-center gap-4 text-white font-azert text-base">
                  <button className="w-20 h-fit bg-[#38629A] rounded-full">
                    <h1>Message</h1>
                  </button>
                  <button className="w-20 h-fit bg-[#A0A0A0] rounded-full">
                    <h1>Unfriend</h1>
                  </button>
                  <button className="w-20 h-fit bg-[#BA5959] rounded-full">
                    <h1>Block</h1>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserAccount;
