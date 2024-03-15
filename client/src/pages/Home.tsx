import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getCurrentDate = () => {
    const currentDate = new Date();
    const dayIndex = currentDate.getDay();
    const day = days[dayIndex];
    const monthIndex = currentDate.getMonth();
    const month = months[monthIndex];
    const date = currentDate.getDate();
    const year = currentDate.getFullYear();
    return `${day} ${month} ${date}, ${year}`;
  };
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-purple-300">
      <h1 className="text-3xl font-bold">Connections Clone</h1>
      <p className="text-lg">Group words that share a common thread.</p>
      <button
        className="rounded-full bg-black px-12 py-3 font-bold text-white"
        onClick={() => navigate("/game")}
      >
        Play
      </button>
      <p>Want to access all of our games?</p>
      <button
        className="rounded-full border border-black px-12 py-3 font-bold"
        onClick={() => navigate("/signin")}
      >
        Log In
      </button>
      <button
        className="rounded-full border border-black px-12 py-3 font-bold"
        onClick={() => console.log("subscribe")}
      >
        Subscribe
      </button>
      <p className="font-bold">{getCurrentDate()}</p>
      <p>By Alex Clayton</p>
    </div>
  );
};
