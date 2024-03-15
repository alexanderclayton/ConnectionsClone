import React, { useState } from "react";
import { TUser } from ".";
import { useAuth } from "../context";

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
      const response = await fetch("http://127.0.0.1:5000/add_user", {
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
    <div className="flex h-full w-full flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="username" className="text-sm font-bold">
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={newUser.username}
          onChange={handleChange}
          className="rounded-sm border"
        />
        <label htmlFor="email" className="text-sm font-bold">
          Email:
        </label>
        <input
          type="text"
          id="email"
          value={newUser.email}
          onChange={handleChange}
          className="rounded-sm border"
        />
        <label htmlFor="password" className="text-sm font-bold">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={newUser.password}
          onChange={handleChange}
          className="rounded-sm border"
        />
        <input
          type="submit"
          value="Create Account"
          className="rounded-sm bg-black font-bold text-white hover:cursor-pointer"
        />
      </form>
    </div>
  );
};
