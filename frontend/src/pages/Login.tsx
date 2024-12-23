import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 flex flex-col gap-36 rounded-xl w-2/4 h-64 text-white items-center justify-center">
      <img src="./favicon.png" alt="liham icon" className="w-36 h-36" />

      <form className="flex flex-col gap-4 items-center justify-center">
        <label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-black p-2 rounded-lg border-2 border-black"
            placeholder="Username"
            type="text"
          />
        </label>
        <label>
          <input
            value={password}
            className="text-black p-2 rounded-lg border-2 border-black"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
        </label>

        <Link to="/" className="bg-primary rounded-lg text-black w-fit h-fit">
          Login
        </Link>

        <Link
          to="/signup"
          className="bg-primary rounded-lg text-black w-fit h-fit"
        >
          Sign up
        </Link>
      </form>
    </div>
  );
}
