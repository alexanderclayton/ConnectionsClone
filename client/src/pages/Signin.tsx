import React, { useState } from "react";
import { useAuth } from "../context";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (
    e: React.FormEvent,
    username: string,
    password: string,
  ) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Log in or create an account</h2>
      <form
        onSubmit={(e) => handleSubmit(e, username, password)}
        className="flex flex-col"
      >
        <label htmlFor="username" className="text-sm font-bold">
          Username:
        </label>
        <input
          type="text"
          id="username"
          className="rounded-sm border"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label htmlFor="password" className="text-sm font-bold">
          Password:
        </label>
        <input
          type="text"
          id="password"
          className="rounded-sm border"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="submit"
          value="Log In"
          className="rounded-sm bg-black font-bold text-white hover:cursor-pointer"
        />
      </form>
      <button
        className="rounded-sm bg-black font-bold text-white hover:cursor-pointer"
        onClick={() => navigate("/createaccount")}
      >
        Create Account
      </button>
      <button
        className="rounded-sm bg-black font-bold text-white hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        Return Home
      </button>
    </div>
  );
};
