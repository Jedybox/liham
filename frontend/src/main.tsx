import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css'
import './styles/fonts.css'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import Signup from './pages/Signup.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import LogOut, { LogOutAndSingIn } from './components/LogOut.tsx'
import UserAccount from './pages/subpages/UserAccount.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App/>
            </ProtectedRoute>
          }
        >
          <Route path="/m/:id" element={<h1>Convo</h1>} />
          <Route path="/u/:id" element={<UserAccount />} />
        </Route>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/logout" element={<LogOut />}/>
        <Route path="/logout-and-sign-in" element={<LogOutAndSingIn />}/>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
