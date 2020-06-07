import React, { createContext, useState, useEffect } from "react";
import AuthRoutes from "./AuthRoutes";
import AppRoutes from "./AppRoutes";
import "./assets/base.scss";

const UserContext = createContext({
  userData: {
    name: "",
    email: "",
    avatar: "",
    role: "",
  },
  token: "",
  saveUserCredentials: (userData: User, token: string) => {},
  logout: () => {},
});

const SidebarContext = createContext({
  open: true,
  setOpen: () => {},
});

const userDataLocalKey = "@eDoc-user";
const tokenLocalKey = "@eDoc-token";

function App() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    avatar: "",
    role: "Super admin",
  });
  const [token, setToken] = useState("");
  const saveUserCredentials = (userData: User, token: string) => {
    localStorage.setItem(userDataLocalKey, JSON.stringify(userData));
    localStorage.setItem(tokenLocalKey, token);
    setUserData(userData);
    setToken(token);
    window.location.href = "/";
  };

  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const localUser = localStorage.getItem(userDataLocalKey);
    if (localUser) {
      setUserData(JSON.parse(localUser));
    }
    const localToken = localStorage.getItem(tokenLocalKey);
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem(userDataLocalKey);
    localStorage.removeItem(tokenLocalKey);
    setToken("");
    setUserData({
      name: "",
      email: "",
      avatar: "",
      role: "",
    });
  };

  return (
    <UserContext.Provider
      value={{ userData, token, saveUserCredentials, logout }}
    >
      {!token ? (
        <AuthRoutes />
      ) : (
        <SidebarContext.Provider
          value={{
            open: sidebarOpen,
            setOpen: () => setSidebarOpen(!sidebarOpen),
          }}
        >
          <AppRoutes />
        </SidebarContext.Provider>
      )}
    </UserContext.Provider>
  );
}

export { SidebarContext, UserContext };
export default App;
