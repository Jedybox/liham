import Switch from "../../components/Switch";
import { useState } from "react";

function UserPrivacy(): JSX.Element {

  const [showFriends, setShowFriends] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-16 w-full h-full bg-subpage rounded-2xl shadow-subpageshadow text-black relative p-6">
      <header>
        <h1 className="text-5xl font-azert">User Privacy</h1>
      </header>
      <section className="text-lg">
        <div className="flex flex-row gap-5">
          <h3>Show Friends in public</h3>
          <Switch isOn={showFriends} handleToggle={() => setShowFriends(!showFriends)} />
        </div>
      </section>
    </div>
  );
}

export default UserPrivacy;