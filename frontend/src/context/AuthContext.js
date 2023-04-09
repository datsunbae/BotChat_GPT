import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextPovider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState([]);

  const [isLoadMyChat, setIsLoadMyChat] = useState(false);

  const login = async (inputs) => {
    const res = await axios.post("/api/auth/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post("/api/auth/logout");
    setCurrentUser(null);
    setChats([]);
    setSelectedChat(null);
  };

  const refreshAccessToken = (accessToken) => {
    console.log("refreshAccessToken" + accessToken);
    setCurrentUser({ ...currentUser, accessToken: accessToken });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login,
        logout,
        refreshAccessToken,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        isLoadMyChat,
        setIsLoadMyChat,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
