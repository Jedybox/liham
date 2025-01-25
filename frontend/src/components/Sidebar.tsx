// import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import Nav from "./Nav";
import SearchBar from "./SearchBar";

function SideBar(): JSX.Element {

  // const navigate = useNavigate();

  const [subject, setSubject] = useState<string>("");

  const search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // navigate(`/search/${subject}`);

    alert(`Searching for ${subject}`);
  }

  return (
    <aside className="relative flex flex-col h-full w-1/4 p-5">
      <SearchBar 
        subject={subject} 
        onChangeSubject={setSubject}
        search={search}
      />
      <div className="w-full h-full">
        
      </div>
      <Nav />
    </aside>
  );
}

export default SideBar;
