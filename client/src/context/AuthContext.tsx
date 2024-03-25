import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type TAuthContext = {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<TAuthContext>({
  token: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const navigate = useNavigate();
  const [token, setToken_] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const setToken = (newToken: string | null) => {
    setToken_(newToken);
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("https://64.23.175.1:5002/login", {
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
        const errorData = await response.json();
        throw new Error(errorData.message || "Login Failed!");
      } else {
        const data = await response.json();
        const { access_token } = data;
        setToken(access_token);
        navigate("/game");
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      login,
      logout,
    }),
    [token],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): TAuthContext => {
  return useContext(AuthContext);
};
