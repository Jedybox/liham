import { Routes, Route,BrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import RouteProtector from "./components/RouteProtector"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import NotFound from "./pages/NotFound"

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
          }/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Signup/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
