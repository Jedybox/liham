import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useEffect } from "react";

const UserAccount = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    document.title = "Liham | Account";

    if (!user) {
      console.log("User not logged in");
    }
  }, []);

  return (
    <div className="flex flex-col  w-full h-full border-2 border-subpage bg-subpage rounded-2xl shadow-subpageshadow p-5">
      <div className="w-full flex flex-row items-center space-x-4 p-4">
        
        <div className="flex items-center text-center justify-center w-32 h-32 bg-slate-200 rounded-full">
          <h1
            className="text-2xl font-azert font-semibold text-slate-900 p-0 m-0"
          >
            {user.name[0]}
          </h1>
        </div>
        
        <h1 className="text-2xl font-azert font-semibold text-slate-900">
          {user.name}
        </h1>

      </div>
      
      <div className="w-full flex flex-col space-y-4 p-4">
        <h2>BIO</h2>
        <p>{user.bio}</p>
      </div>

    </div>
  );
};

export default UserAccount;
