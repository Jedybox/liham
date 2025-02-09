import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./styles/fonts.css";
import App from "./App.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import LogOut, { LogOutAndSingIn } from "./components/LogOut.tsx";
import UserAccount from "./pages/subpages/UserAccount.tsx";
import UserPrivacy from "./pages/subpages/UserPrivacy.tsx";
import UserPreferences from "./pages/subpages/UserPreferences.tsx";
import About from "./pages/subpages/About.tsx";
import Learn from "./pages/subpages/Learn.tsx";
import Conversation from "./pages/subpages/Conversation.tsx";
import { store } from "./state/store.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Provider store={store}>
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            </Provider>
          }
        >
          <Route path="/m/:id" element={<Conversation />} />
          <Route path="/u/:id" element={<UserAccount />} />
          <Route path="/privacy" element={<UserPrivacy />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/preferences" element={<UserPreferences />} />
          <Route path="/about" element={<About />} />
          <Route path="/learn" element={<Learn />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/logout-and-sign-in" element={<LogOutAndSingIn />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
