import React, { useState } from "react";
import { useAuth } from "../context";
import { TUser } from "../types";
import { VscEye } from "react-icons/vsc";

export const CreateAccount = () => {
  const { login } = useAuth();
  const [newUser, setNewUser] = useState<TUser>({
    username: "",
    email: "",
    password: "",
    record: [
      {
        date: "14March2024",
        score: 0,
      },
    ],
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(newUser);
    addUser();
  };

  const addUser = async () => {
    try {
      const response = await fetch("http://64.23.175.1:5002/add_user", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
          record: newUser.record,
        }),
      });
      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(`Failed to add user: ${responseBody.message}`);
      }
      console.log("added user");
      login(newUser.username, newUser.password);
    } catch (error: unknown) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-3">
      <h2 className="mt-4 text-3xl">Create your account</h2>
      <form onSubmit={handleSubmit} className="flex w-full max-w-96 flex-col">
        <label htmlFor="username" className="mt-6 text-sm font-bold">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={newUser.username}
          onChange={handleChange}
          className="mt-1 h-12 rounded-sm border border-black pl-4 focus:outline-none"
        />
        <label htmlFor="email" className="mt-6 text-sm font-bold">
          Email:
        </label>
        <input
          type="text"
          id="email"
          value={newUser.email}
          onChange={handleChange}
          className="mt-1 h-12 rounded-sm border border-black pl-4 focus:outline-none"
        />
        <label htmlFor="password" className="mt-6 text-sm font-bold">
          Password:
        </label>
        <div className="mt-1 flex h-12 items-center justify-around rounded-sm border border-black">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={newUser.password}
            onChange={handleChange}
            className="h-full w-full pl-4 focus:outline-none"
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
          value="Create Account"
          className="mt-4 h-12 rounded-sm bg-black font-bold text-white hover:cursor-pointer"
        />
      </form>
    </div>
  );
};
