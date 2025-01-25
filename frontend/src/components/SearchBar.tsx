import { SearcIcon } from "./SVGIcons";
import { useState } from "react";

interface SearchBarProps {
    subject: string;
    onChangeSubject: (e: string) => void;
    search: (event: React.FormEvent<HTMLFormElement>) => void;
    changeTab: (event: React.FocusEvent<HTMLInputElement>) => void;
}

function SearchBar({ subject, onChangeSubject, search, changeTab } : SearchBarProps): JSX.Element {
  
  const [focused, setFocused] = useState<boolean>(false);

    return (
    <form 
        className="flex flex-row items-center justify-center w-full h-fit py-2 bg-primary rounded-full px-3 gap-1 overflow-hidden border-black border-[1px]"
        onSubmit={search}
    >
      <SearcIcon focused={focused}/>
      <input
        id="search"
        onFocus={(e) => {
            setFocused(true);
            e.target.placeholder = "";
            changeTab(e);
        }}
        onBlur={(e) => {
            setFocused(false);
            e.target.placeholder = "Search";
        }}
        className="w-full h-ful bg-transparent focus:outline-none focus:border-none"
        type="text"
        placeholder="Search"
        value={subject}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeSubject(e.target.value)}
      />
    </form>
  );
}

export default SearchBar;
