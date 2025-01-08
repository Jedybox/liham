import { Routes, Route,BrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import RouteProtector from "./components/RouteProtector"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import NotFound from "./pages/NotFound"
import Account from "./pages/settings/Account"
import Notifications from "./pages/settings/Notificatons"
import PrivacyAndSecurity from "./pages/settings/PrivacyAndSecurity"
import Personalization from "./pages/settings/Personalzation"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RouteProtector>
              <Home />
            </RouteProtector>
          }
          children={[
            <Route key={"profile"} path="a/:id" element={<Account/>} />,
            <Route key={"notifications"} path="n/:id" element={<Notifications/>} />,
            <Route key={"secutiry"} path="s/:id" element={<PrivacyAndSecurity/>} />,
            <Route key={"personalization"} path="p/:id" element={<Personalization/>} />
          ]}
          /*children={[
            <Route key="dashboard" path="m/:id" element={<Dashboard />} />,
            <Route key="profile" path="s/:id" element={<Profile />} />
          ]}*//>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Signup/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
