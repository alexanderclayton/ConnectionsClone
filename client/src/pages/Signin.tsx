//import//
import { useState } from "react";
import { useAuth } from "../context";

export const Signin = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        className="border"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="text"
        id="password"
        className="border"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={() => login(username, password)}>Test</button>
      <button onClick={() => console.log(username, password)}>
        Test Values
      </button>
    </div>
  );
};
