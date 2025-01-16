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
      
      className="flex flex-col items-center justify-center"
    >
      <img // icon
        className="mt-28 mb-36"
        src={icon}
        alt="icon"
        width="175"
        height="175"
      />

      <form 
        onSubmit={handleSubmit} 
        method="post"
        className="flex flex-col items-center justify-center space-y-4"
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
        <br />
        <button type="submit">Log-in</button>
        <button 
          type="button" 
          onClick={() => navigate("/signup")}
        >
          Sign-up
        </button>
        <br />
        <button 
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
