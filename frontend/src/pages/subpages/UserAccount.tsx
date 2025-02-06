import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useEffect } from "react";

import cover from "../../temp/cover.jpg";
import pfp from "../../temp/pfp.png";

const UserAccount = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    document.title = "Liham | Account";

    if (!user) {
      console.log("User not logged in");
    }
  }, []);

  return (
    <div className="flex flex-col  w-full h-full bg-subpage rounded-2xl shadow-subpageshadow">
      <header className="h-1/4 w-full flex items-center justify-center rounded-t-2xl overflow-hidden relative">
        <img
          src={cover}
          alt="cover"
          className="w-full object-cover rounded-t-2xl"
        />
      </header>

      <div className="z-10 flex flex-row items-center -mt-[4.5rem] mx-[6%] w-fit-content h-fit-contetnt">
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

      <section className="flex flex-row items-center justify-center w-full">
        <div className="flex flex-col w-1/2 h-full">
          <div>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>

            <p>
              <span className="font-semibold">Bio:</span> {user.bio}
            </p>
          </div>
        </div>
        <div className="w-1/2"></div>
      </section>
    </div>
  );
};

export default UserAccount;
