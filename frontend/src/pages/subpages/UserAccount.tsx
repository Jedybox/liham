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
      
    </div>
  );
};

export default UserAccount;
