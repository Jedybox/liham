import { SearcIcon } from "./SVGIcons";

interface SearchBarProps {
    subject: string;
    onChangeSubject: (e: string) => void;
    search: (event: React.FormEvent<HTMLFormElement>) => void;
    changeTab: (event: React.FocusEvent<HTMLInputElement>) => void;
}

function SearchBar({ subject, onChangeSubject, search, changeTab } : SearchBarProps): JSX.Element {
  

    return (
    <form 
        className="flex flex-row items-center justify-center w-full h-fit py-2 bg-primary rounded-full px-3 gap-1 overflow-hidden border-black border-[1px]"
        onSubmit={search}
    >
      <SearcIcon/>
      <input
        id="search"
        onFocus={(e) => {
            e.target.placeholder = "";
            changeTab(e);
        }}
        className="w-full h-ful bg-transparent focus:outline-none focus:border-none"
        type="text"
        placeholder="Search"
        value={subject}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChangeSubject(e.target.value);
          console.log(e.target.value);
        }}
      />
    </form>
  );
}

export default SearchBar;
