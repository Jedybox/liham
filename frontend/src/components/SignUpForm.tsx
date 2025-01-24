import React, { useEffect, useState } from "react";
import { InputFieldSignUp } from "./InputField";
import { TermsAndRegulations } from "./Dialog";
import { useNavigate } from "react-router-dom";
import api from "../api";

interface SignUpFormProps {
  theCode: string;
  email: string;
}

function SignUpForm({ theCode, email }: SignUpFormProps): JSX.Element {

  const navigate = useNavigate();

  const [agree, setAgree] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [code, setCode] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [reEnter, setReEnter] = useState<string>("");

  const [username, setUsername] = useState<string>("");

  const [verificationPosition, setVerificationPosition] =
    useState<string>("top-[47.5%]");
  const [passwordPosition, setPasswordPosition] =
    useState<string>("top-[100%]");
  const [usernamePosition, setUsernamePosition] =
    useState<string>("top-[100%]");

  const handleCode = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (theCode !== code) {
      alert("Invalid Code");
      return;
    }

    setVerificationPosition("-top-[78px]");
    setPasswordPosition("top-[46.5%]");
  };

  const handlePassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === "" || reEnter === "") {
      alert("Password cannot be empty");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    if (password !== reEnter) {
      alert("Passwords do not match");
      return;
    }

    setPasswordPosition("-top-[133px]");
    setUsernamePosition("top-[47.5%]");
  };

  const handleUserName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username === "") {
      alert("Username cannot be empty");
      return;
    }

    setIsDialogOpen(true);
    console.log('n')
  };

  const [transx, setTransx] = useState<string>("translate-x-[100%]");

  const createAccount = async () => {
    api.post("/user/create-user/", {
      username: username,
      password: password,
      email: email,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.status === 201) {
        alert("Account Created");
        navigate("/login");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  };

  useEffect(() => {
    setTransx("translate-x-0");
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center w-full h-full p-20 ${transx} transition-all duration-[1.25s] ease-in-out"`}>
      <div className="relative w-full h-full bg-subpage rounded-xl shadow-iconLog flex flex-col items-centers justify-center overflow-hidden">
        <form
          onSubmit={handleCode}
          method="post"
          className={`absolute h-fit w-fit self-center flex flex-col items-center gap-3 ${verificationPosition} transition-all duration-500 ease-in-out`}
        >
          <InputFieldSignUp
            placeholder="Verification Code"
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />

          <button
            className="shadow-inputfield bg-agree w-24 h-5 text-white text-xs rounded-xl font-azert"
            type="submit"
          >
            Verify
          </button>
        </form>

        <form
          onSubmit={handlePassword}
          className={`absolute h-fit w-fit self-center flex flex-col items-center gap-3 ${passwordPosition} transition-all duration-500 ease-in-out`}
        >
          <InputFieldSignUp
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputFieldSignUp
            type="password"
            placeholder="Re-Enter Password"
            value={reEnter}
            onChange={(e) => setReEnter(e.target.value)}
          />
          <button
            className="shadow-inputfield bg-agree w-32 h-5 text-white text-xs rounded-xl"
            type="submit"
          >
            Create Passowrd
          </button>
        </form>

        <form
          onSubmit={handleUserName}
          method="post"
          className={`absolute h-fit w-fit self-center flex flex-col items-center gap-3 ${usernamePosition} transition-all duration-500 ease-in-out`}
        >
          <InputFieldSignUp
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <button
            className="shadow-inputfield bg-agree w-28 h-5 text-white text-xs rounded-xl"
            type="submit"
          >
            Create Account
          </button>
        </form>
      </div>
      <TermsAndRegulations
        isOpen={isDialogOpen}
        agree={() => setAgree(!agree)}
        close={() => setIsDialogOpen(false)}
        agreed={agree}
        createAccount={() => createAccount()}
      />
    </div>
  );
}

export default SignUpForm;
