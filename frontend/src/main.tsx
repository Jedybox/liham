import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import Convo from './components/Convo.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'm/:id',
        element: <Convo/>,
      },
      {
        path: 'privacy-settings',
        element: <div>Privacy Settings</div>
      },
      {
        path: 'notification-settings',
        element: <div>Notification Settings</div>
      },
      {
        path: 'account-settings',
        element: <div>Account Settings</div>
      },
      {
        path: 'personalization',
        element: <div>Personalization</div>
      }
    ]
  },
  {
    path: 'register',
    element: <Register />
  },
  {
    path: 'login',
    element: <Login />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
