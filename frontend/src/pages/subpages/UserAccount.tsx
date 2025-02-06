import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useEffect } from "react";

import cover from "../../temp/cover.jpg";
import pfp from "../../temp/pfp.png";

const UserAccount = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);

  // const isOnline: boolean = user.isOnline;

  useEffect(() => {
    document.title = "Liham | Account";

    if (!user) {
      console.log("User not logged in");
    }
  }, []);

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
        <div className="text-2xl font-azert font-medium  ml-4 px-3 py-1 bg-subpage rounded-full  tracking-tighter">
          <h1>{user.name}</h1>
        </div>

        <div className="h-4 w-4 bg-isOnline rounded-full ml-2" />
      </div>

      <section className="flex flex-row items-center justify-center w-full h-3/5 font-azert bottom-0 absolute">
        <div className="flex flex-col w-1/2 h-full tracking-tighter px-4 py-2">
          <div className="ml-[5%] w-fit h-fit">
            <p>
              <span className="">Email:</span> {user.email}
            </p>
          </div>
          <div className="ml-[5%] w-fit h-fit">
            <p>
              {user.bio === "" ? "Bio: No bio provided" : "Bio: " + user.bio}
            </p>
          </div>
          <div className="ml-[5%]">
            <label className="flex justify-between items-center w-fit h-fit">
              {/* <input type="checkbox" className="appearance-none peer" checked={isOnline}/> */}
              <input type="checkbox" className="appearance-none peer" />
              <span className="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6"></span>
            </label>
          </div>
        </div>
        <div className="w-1/2"></div>
      </section>
    </div>
  );
};

export default UserAccount;
