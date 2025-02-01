import { useParams } from "react-router-dom";

const UserAccount = (): JSX.Element => {
  const { id } = useParams();

  

  return (
    <div className="flex flex-col items-center justify-center w-full h-full border-2 border-subpage bg-subpage rounded-2xl shadow-subpageshadow">
      <h1 className="text-3xl font-bold">User Account</h1>
      <p className="text-lg">User ID: {id}</p>
    </div>
  );
};

export default UserAccount;
