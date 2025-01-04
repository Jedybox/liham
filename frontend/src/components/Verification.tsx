import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

interface VerificationProps {
  email: string;
  code: number;
}

function Verification(
  props: VerificationProps
): JSX.Element | null | undefined {

  const navigateTo = useNavigate();

  const [verificationCode, setVerificationCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [verificationCss, setVerificationCss] = useState({
    right: "calc(50% - 100.5px)",
  })

  const [passwordCss, setPasswordCss] = useState({
    right: "-100%",
  })

  const [usernameCss, setUsernameCss] = useState({
    right: "-100%",
  })

  const verify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const createPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setUsernameCss({ right: "calc(50% - 100.5px)" })
      setPasswordCss({ right: "200%" })
    }
  }

  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await api.post("/api/create-user/", {
        email: props.email,
        username,
        password,
      });

      if (response.status === 201) {
        navigateTo("/login");
      }

    } catch {
      alert("An error occurred. Please try again.");
      return;
    }

  }

  return (
    <div className="absolute w-2/3 right-0 h-5/6 translate-x- translate-y- bg-white rounded-xl shadow-2xl flex flex-col items-center justify-center gap-4 overflow-hidden">
      <form
        onSubmit={verify}
        className=" absolute flex flex-col gap-4 items-center justify-center transition-all duration-500 ease-out"
        style={verificationCss}
      >
        <label htmlFor="verification-code" className="text-black">
          Verification Code
        </label>
        <input
          type="text"
          name="verification-code"
          id="verification-code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className="text-black p-2 rounded-lg border-2 border-black"
        />
        <button 
          type="submit" 
          className="bg-black text-white p-2 rounded-lg"
          onClick={() => {

            const codeAsNumber = Number(verificationCode);
            if (codeAsNumber === props.code) {
              setPasswordCss({ right: "calc(50% - 100.5px)" })
              setVerificationCss({ right: "200%" })
            }
            
          }}
        >
          Verify
        </button>
        <button
          type="button"
          className="bg-black text-white p-2 rounded-lg"
          onClick={() => {
            api.post("/api/send-email/", { email: props.email });
          }}>
          Re-send
        </button>
      </form>

      <form onSubmit={createPassword}
        className=" absolute flex flex-col gap-4 items-center justify-center transition-all duration-500 ease-out"
        style={passwordCss}>
        <label htmlFor="password" className="text-black">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-black p-2 rounded-lg border-2 border-black"
        />
        <label htmlFor="confirm-password" className="text-black">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="text-black p-2 rounded-lg border-2 border-black"
        />
        <button 
          type="submit" 
          className="bg-black text-white p-2 rounded-lg"
        >
          Change Password
        </button>
      </form>

      <form 
        className="absolute flex flex-col gap-4 items-center justify-center transition-all duration-500 ease-out"
        style={usernameCss}
        onSubmit={createUser}>
        <label htmlFor="username" className="text-black">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="text-black p-2 rounded-lg border-2 border-black"
        />
        <button 
          type="submit" 
          className="bg-black text-white p-2 rounded-lg"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Verification;
