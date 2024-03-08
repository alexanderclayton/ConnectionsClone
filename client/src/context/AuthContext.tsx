import React, { createContext, useContext, useState } from "react";
import { TUser } from "../pages";
import { useNavigate } from "react-router-dom";

type TAuthContext = {
  user: TUser | undefined;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<TAuthContext>({
  user: undefined,
  login: async () => {},
  logout: () => {},
  loading: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be usd within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<TUser | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/get_user", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const fetchedUser = await response.json();
      setUser(fetchedUser);
      setLoading(false);
      navigate("/game");
    } catch (error: unknown) {
      setLoading(false);
      console.error("Error fetching user:", error);
      throw new Error("Failed to authenticate user");
    }
  };

  const logout = () => {
    setUser(undefined);
  };

  const authContextValue: TAuthContext = {
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

//Wrap auth protected components with <AuthProvider></AuthProvider>
//import useAuth() into components to use the user, login, logout, loading values as { user, login, logout, loading } = useAuth()
