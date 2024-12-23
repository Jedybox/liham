import icon from "../assets/favicon.svg";
import { useState } from "react";
import Verification from "../components/Verification";

export default function Signup(): JSX.Element {
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  const [emailFormCss, setEmailFormCss] = useState({
    top: "25%",
    left: "45%",
    position: "absolute" as
      | "absolute"
      | "relative"
      | "fixed"
      | "sticky"
      | "static"
      | "inherit"
      | "initial"
      | "unset",
    width: "2/4",
    height: "64",
    borderRadius: "xl",
    text: "white",
    display: "flex",
    items: "center",
    justify: "center",
    gap: "36",
    p: "4",
    flex: "column" as "column" | "row" | "row-reverse" | "column-reverse",
  });

  const [email, setEmail] = useState<string>("");

  return (
    <>
      <div
        className="gap-36 transition-all duration-500 ease-out w-"
        id="email-form"
        style={{
          top: emailFormCss.top,
          left: emailFormCss.left,
          position: emailFormCss.position,
          width: emailFormCss.width,
          height: emailFormCss.height,
          borderRadius: emailFormCss.borderRadius,
          backgroundColor: emailFormCss.text,
          display: emailFormCss.display,
          alignItems: emailFormCss.items,
          justifyContent: emailFormCss.justify,
          gap: emailFormCss.gap,
          padding: emailFormCss.p,
          flexDirection: emailFormCss.flex,
        }}
      >
        <img src={icon} alt="liham icon" className="w-36 h-36" />

        <form className="flex flex-col gap-4 items-center justify-center">
          <label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black p-2 rounded-lg border-2 border-black"
              placeholder="Email"
              type="email"
            />
          </label>
          <button
            type="submit"
            className="bg-primary rounded-lg text-black w-fit h-fit"
            onClick={(e) => {
              
              e.preventDefault();

              if (isEmailValid === true) return;

              setEmailFormCss({
                top: "25%",
                left: "10%",
                position: "absolute" as
                  | "absolute"
                  | "relative"
                  | "fixed"
                  | "sticky"
                  | "static"
                  | "inherit"
                  | "initial"
                  | "unset",
                width: "2/4",
                height: "64",
                borderRadius: "xl",
                text: "white",
                display: "flex",
                items: "center",
                justify: "center",
                gap: "36",
                p: "4",
                flex: "column" as
                  | "column"
                  | "row"
                  | "row-reverse"
                  | "column-reverse",
              });

              setIsEmailValid(true);
              setTimeout(() => console.log(isEmailValid), 1000);
            }}
          >
            Confirm
          </button>
        </form>
      </div>
      {isEmailValid && <Verification isVerified={isEmailValid} token=""/>}
    </>
  );
}
