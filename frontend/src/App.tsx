import SideBar from "./components/Sidebar"
import { Outlet } from "react-router-dom"

function App() {

  return (
    <>
      <SideBar />
      <div className="w-full h-full p-6">
        <Outlet/>
      </div>
    </>
  )
}

export default App
