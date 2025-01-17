import icon from "../assets/icons/icon.png";
import InputField from "../components/InputField";

import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login(): JSX.Element {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div
      
      className="flex flex-col items-center justify-center w-fit h-full self-center"
    >
      <img // icon
        className="mb-36 shadow-iconLog rounded-full"
        src={icon}
        alt="icon"
        width="175"
        height="175"
      />

      <form 
        onSubmit={handleSubmit} 
        method="post"
        className="flex flex-col items-center justify-center space-y-3"
      >
        <InputField
          label="Username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          className="flex flex-row items-center justify-center space-x-4 w-fit h-fit"
        >
          <button 
            className="shadow-inputfield bg-agree w-24 h-5 text-white text-xs rounded-xl"
            type="submit"
          >
            Log-in
          </button>
          <button 
            className="shadow-inputfield bg-disagree  w-24 h-5 text-white text-xs rounded-xl"
            type="button" 
            onClick={() => navigate("/signup")}
          >
            Sign-up
          </button>
        </div>
        <button 
          className="text-xs"
          type="button" 
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password
        </button>
      </form>
    </div>
  );
}

export default Login;
