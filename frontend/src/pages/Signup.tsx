import icon from "../assets/favicon.svg";
import { useNavigate, Outlet } from "react-router-dom";
import { useState } from "react";

export default function Signup(): JSX.Element {
  const navigate = useNavigate();

  let isEmailValid = false;

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
        className="gap-36 transition-all duration-500 ease-out"
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
            className="bg-primary rounded-lg text-black w-fit h-fit"
            onClick={() => {
              setEmailFormCss({
                top: "25%",
                left: "0%",
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

              isEmailValid = true;

              if (isEmailValid) {
                navigate("/signup/verification");
              }
            }}
          >
            Confirm
          </button>
        </form>
      </div>
      <Outlet />
    </>
  );
}
