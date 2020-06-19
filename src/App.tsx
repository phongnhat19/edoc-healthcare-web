import React, { createContext, useState, useEffect } from "react";
import AuthRoutes from "./AuthRoutes";
import AppRoutes from "./AppRoutes";
import "./assets/base.scss";
import "./App.css";

const UserContext = createContext({
  userData: {
    _id: "",
    name: "",
    email: "",
    avatar: "",
    role: "",
    bcAddress: "",
    seedEncrypted: "",
    privateEncrypted: "",
  },
  token: "",
  saveUserCredentials: (userData: User, token: string) => {},
  updateUserProfile: (userDate: User) => {},
  logout: () => {},
});

const SidebarContext = createContext({
  open: false,
  setOpen: () => {},
});

const userDataLocalKey = "@eDoc-user";
const tokenLocalKey = "@eDoc-token";

function App() {
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    email: "",
    avatar: "",
    role: "Super admin",
    privateEncrypted: "",
    seedEncrypted: "",
    bcAddress: "",
  });
  const [token, setToken] = useState("");
  const saveUserCredentials = (userData: User, token: string) => {
    localStorage.setItem(userDataLocalKey, JSON.stringify(userData));
    localStorage.setItem(tokenLocalKey, token);
    setUserData(userData);
    setToken(token);
    window.location.href = "/";
  };

  const updateUserProfile = (userData: User) => {
    localStorage.setItem(userDataLocalKey, JSON.stringify(userData));
    setUserData(userData);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      _id: "",
      name: "",
      email: "",
      avatar: "",
      role: "",
      bcAddress: "",
      seedEncrypted: "",
      privateEncrypted: "",
    });
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        token,
        saveUserCredentials,
        updateUserProfile,
        logout,
      }}
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
