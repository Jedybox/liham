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
        </Route>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/logout" element={<LogOut />}/>
        <Route path="/logout-and-sign-in" element={<LogOutAndSingIn />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
