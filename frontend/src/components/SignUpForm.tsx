import React, { useState } from "react";
import { InputFieldSignUp } from "./InputField";
import { TermsAndRegulations } from "./Dialog";

interface SignUpFormProps {
  className: string;
}

function SignUpForm({ className }: SignUpFormProps): JSX.Element {
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
    setVerificationPosition("-top-[78px]");
    setPasswordPosition("top-[46.5%]");
  };

  const handlePassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordPosition("-top-[133px]");
    setUsernamePosition("top-[47.5%]");
  };

  const handleUserName = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsDialogOpen(true);
    console.log('n')
  };

  return (
    <div className={className}>
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
            className="shadow-inputfield bg-agree w-24 h-5 text-white text-xs rounded-xl"
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
            className="shadow-inputfield bg-agree w-24 h-5 text-white text-xs rounded-xl"
            type="submit"
          >
            Verify
          </button>
        </form>
      </div>
      <TermsAndRegulations
        isOpen={isDialogOpen}
        agree={() => setAgree(!agree)}
        close={() => setIsDialogOpen(false)}
        agreed={agree}
      />
    </div>
  );
}

export default SignUpForm;
