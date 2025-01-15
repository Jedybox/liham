import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css'
import './styles/fonts.css'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import Signup from './pages/Signup.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import Logout from './components/LogOut.tsx'
import LogOutAndSingIn from './components/LogOutAndSignOut.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/logout" element={<Logout />}/>
        <Route path="/logout-and-sign-in" element={<LogOutAndSingIn />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
