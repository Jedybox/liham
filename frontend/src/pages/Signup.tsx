import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import { useState } from "react";
import icon from "../assets/icons/icon.png";

function Signup(): JSX.Element {
  const [email, setEmail] = useState<string>("");

  const [ifEmailFormMoved, setFirstFormPosition] = useState<boolean>(false);

    const handleEmail = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFirstFormPosition(true);
    }

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
        className={`flex flex-col items-center justify-center w-1/4 h-full ${ifEmailFormMoved ? 'translate-x-0' :'translate-x-[140%]'} transition-all duration-500 ease-in-out`}
      >
        <img // icon
          className="mb-36 shadow-iconLog rounded-full"
          src={icon}
          alt="icon"
          width="175"
          height="175"
        />
        <form onSubmit={handleEmail} method="post"
          className="flex flex-col items-center gap-5 w-72 h-36">
          <InputField
            label="Email"
            type="email"
            name="username"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button 
            className="shadow-inputfield bg-agree w-24 h-5 text-white text-xs rounded-xl"
            type="submit"
          >
            Use Email
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
