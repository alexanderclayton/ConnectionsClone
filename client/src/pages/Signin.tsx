import React, { useState } from "react";
import { useAuth } from "../context";
import { useNavigate } from "react-router-dom";
import { VscEye } from "react-icons/vsc";

export const Signin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (
    e: React.FormEvent,
    username: string,
    password: string,
  ) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-3">
      <h2 className="mt-4 text-3xl">Log in or create an account</h2>
      <form
        onSubmit={(e) => handleSubmit(e, username, password)}
        className="flex w-full max-w-96 flex-col"
      >
        <label htmlFor="username" className="mt-6 text-sm font-bold">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="mt-1 h-12 rounded-sm border border-black pl-4 focus:outline-none"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label htmlFor="password" className="mt-4 text-sm font-bold">
          Password
        </label>
        <div className="mt-1 flex h-12 items-center justify-around rounded-sm border border-black">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="h-full w-full pl-4 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <VscEye
            size={25}
            className="mx-4 text-gray-500 hover:cursor-pointer"
            onMouseDown={() => setShowPassword(true)}
            onMouseUp={() => setShowPassword(false)}
            onMouseLeave={() => setShowPassword(false)}
          />
        </div>
        <input
          type="submit"
          value="Log In"
          className="mt-4 h-12 rounded-sm bg-black font-bold text-white hover:cursor-pointer"
        />
      </form>
      <button
        className="mt-4 h-12 w-full max-w-96 rounded-sm border border-black font-bold hover:cursor-pointer"
        onClick={() => navigate("/createaccount")}
      >
        Create Account
      </button>
      <button className="mt-4 " onClick={() => navigate("/")}>
        Return Home
      </button>
    </div>
  );
};
