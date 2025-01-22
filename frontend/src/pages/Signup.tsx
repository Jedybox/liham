import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import { useState } from "react";
import icon from "../assets/icons/icon.png";
import SignUpForm from "../components/SignUpForm";
import api from "../api";

function Signup(): JSX.Element {
  const [email, setEmail] = useState<string>("");

  const [EmailFormMoved, setFirstFormPosition] = useState<boolean>(false);
  const [SignUpFormMoved, setSignUpFormMoved] = useState<boolean>(false);

  const [VerificationCode, setVerificationCode] = useState<number|undefined>();

  const handleEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {

      const response = await api.post("/user/check-email/", 
        { email }
      )

      if (response.status === 200) {
        setFirstFormPosition(true);
        setSignUpFormMoved(true);
        setVerificationCode(response.data.verificationCode);
      }

    } catch  (error) {
      console.error(error);
    }

  };

  const getForm = (code: string) => <SignUpForm theCode={code} email={email}/>;

  return (
    <>
      <Link
        to="/login"
        className="flex flex-row items-center gap-2 w-fit-content h-fit-content mt-5 ml-10 absolute z-10"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.65 18L18.85 29.2L16 32L0 16L16 0L18.85 2.8L7.65 14H32V18H7.65Z"
            fill="#1D1B20"
          />
        </svg>
        <p>Log-in</p>
      </Link>

      <div
        className={`flex flex-col items-center justify-center w-1/3 h-full ${
          EmailFormMoved ? "translate-x-0" : "translate-x-[150%]"
        } transition-all duration-500 ease-in-out`}
      >
        <img // icon
          className="mb-36 shadow-iconLog rounded-full"
          src={icon}
          alt="icon"
          width="175"
          height="175"
        />
        <form
          onSubmit={handleEmail}
          method="post"
          className="flex flex-col items-center gap-5 w-72 h-36"
        >
          <InputField
            label="Email"
            type="text"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button
            className="shadow-inputfield bg-agree w-24 h-5 text-white text-xs rounded-xl"
            type="submit"
            disabled={EmailFormMoved}
          >
            Use Email
          </button>
        </form>
      </div>
      <div className="w-full h-full">
        {SignUpFormMoved && getForm(VerificationCode?.toString() || "")}
      </div>
    </>
  );
}

export default Signup;
