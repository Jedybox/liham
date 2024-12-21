import { useState } from "react"
import { Outlet } from "react-router-dom"
import Settings from "./components/settings"

function App() {

  const [underline, setUnderline] = useState({
    height: "4px",
    width: "82px",
    left: 8
  })

  const [messages, setMessages] = useState(true)
  const [settings, setSettings] = useState(false)

  const [search, setSearch] = useState(false)
  const [searchColor, setSearchColor] = useState("white")

  const [notif, setNotif] = useState(false)
  const [notifColor, setNotifColor] = useState("#E8EAED")

  return (
    <>
      <aside 
        id="sidebar" 
        className="relative h-full w-96 bg-sidebar-primary rounded-xl flex flex-col text-white overflow-x-hidden">

        <nav 
          id="nav"
          className="relative flex flex-row w-full p-2 overflow-hidden h-fit">

          <ul
            id="nav-list"
            className="flex flex-row justify-between gap-2 font-Poppins w-fit">
            <button 
              onClick={() => {
                if (messages) return;
                setUnderline({width: "82px", left: 8, height: "4px"})
                setMessages(true);

                if (notif) {
                  setNotifColor("#E8EAED");
                  setNotif(false);
                }

                if (search) {
                  setSearchColor("white");
                  setSearch(false);
                }
                
                if (settings) {
                  setSettings(false);
                }
                
              }}
              >Messages</button>
            <button 
              onClick={() => {
                if (settings) return;
                setUnderline({width: "67px", left: 95, height: "4px"})
                setSettings(true);

                if (notif) {
                  setNotifColor("#E8EAED");
                  setNotif(false);
                }

                if (search) {
                  setSearchColor("white");
                  setSearch(false);
                }

                if (messages) {
                  setMessages(false);
                }
              }}
              >Settings</button>
          </ul>

          <div 
            id="icons"
            className="absolute right-2 flex flex-row w-fit h-fit justify-between gap-2"
           >
            
            <button
              id="notif"
              className="relative p-1 w-6 h-6 transition-all duration-200 ease-out rounded-full flex justify-center items-center"
              style={{backgroundColor: notif ? "white" : "transparent"}}
              onClick={ () => {
                if (notif) return;

                setNotifColor("black");
                setNotif(true);
                setSearchColor("white");
                setSearch(false);
                setMessages(false);
                setSettings(false);
                setUnderline({width: underline.width, height: "0px" , left: underline.left});
              }}>
              <svg
                width="16"
                height="22"
                viewBox="0 0 29 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 29.75V26.25H3.625V14C3.625 11.5792 4.38021 9.42812 5.89062 7.54688C7.40104 5.66563 9.36458 4.43333 11.7812 3.85V2.625C11.7812 1.89583 12.0456 1.27604 12.5742 0.765625C13.1029 0.255208 13.7448 0 14.5 0C15.2552 0 15.8971 0.255208 16.4258 0.765625C16.9544 1.27604 17.2188 1.89583 17.2188 2.625V3.85C19.6354 4.43333 21.599 5.66563 23.1094 7.54688C24.6198 9.42812 25.375 11.5792 25.375 14V26.25H29V29.75H0ZM14.5 35C13.5031 35 12.6497 34.6573 11.9398 33.9719C11.2299 33.2865 10.875 32.4625 10.875 31.5H18.125C18.125 32.4625 17.7701 33.2865 17.0602 33.9719C16.3503 34.6573 15.4969 35 14.5 35ZM7.25 26.25H21.75V14C21.75 12.075 21.0401 10.4271 19.6203 9.05625C18.2005 7.68542 16.4937 7 14.5 7C12.5063 7 10.7995 7.68542 9.37969 9.05625C7.9599 10.4271 7.25 12.075 7.25 14V26.25Z"
                  fill={notifColor}
                />
              </svg>
            </button>

            <button
              className="relative p-1 w-6 h-6 transition-all duration-200 ease-out rounded-full flex justify-center items-center"
              id="search"
              style={{backgroundColor: search ? "white" : "transparent"}}
              onClick={() => {
                if (search) 
                  return;
                
                setSearchColor("#181818");
                setSearch(!search);
                setNotifColor("#E8EAED");
                setNotif(false);
                setMessages(false);
                setSettings(false);
                setUnderline({width: underline.width, height: "0px" , left: underline.left});
              }}>

              <svg
                width="16"
                height="22"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26 26L20.2 20.2M23.3333 12.6667C23.3333 18.5577 18.5577 23.3333 12.6667 23.3333C6.77563 23.3333 2 18.5577 2 12.6667C2 6.77563 6.77563 2 12.6667 2C18.5577 2 23.3333 6.77563 23.3333 12.6667Z"
                  stroke={searchColor}
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

            </button>
          
          </div>

          <div 
            id="underline"
            className="absolute bottom-1 bg-white rounded transition-all duration-300 ease-out"
            style={{width: underline.width, height: underline.height, left: underline.left}}
            ></div>
        </nav>
        
        {messages && <h1>messages</h1>}
        {settings && <Settings />}
        {search && <h1>search</h1>}
        {notif && <h1>notif</h1>}

      </aside>
      <main 
        id="main" 
        className="relative h-full w-4/5  rounded-xl content-center flex flex-col justify-center items-center">
        <Outlet />
      </main>
    </>
  )
}

export default App
