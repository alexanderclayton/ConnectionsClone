import { createContext, useContext, useState } from "react";
import { TUser } from "../App";

type TAuthContext = {
  user: TUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<TUser | undefined>>;
};

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be usd within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<TUser | undefined>(undefined);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

//Wrap auth protected components with <AuthProvider></AuthProvider>
//import useAuth() into components to use the user, setUser values as { user, setUser } = useAuth()
