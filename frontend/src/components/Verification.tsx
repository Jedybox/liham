import { useState } from "react";

interface VerificationProps {
  isVerified: boolean;
  token: string;
}

function Verification(
  props: VerificationProps
): JSX.Element | null | undefined {

  const [verificationCode, setVerificationCode] = useState<string>("");

  if (!props.isVerified) return null;

  const verify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="absolute w-2/3 right-0 h-5/6 translate-x- translate-y- bg-white rounded-xl shadow-2xl flex flex-col items-center justify-center gap-4 overflow-hidden">
      <form
        onSubmit={verify}
        className=" absolute flex flex-col gap-4 items-center justify-center"
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
        >
          Verify
        </button>
      </form>
    </div>
  );
}

export default Verification;
