import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import { IoExtensionPuzzleOutline } from "react-icons/io5";

export const Home = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

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

  useLayoutEffect(() => {
    logout();
  }, []);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-purple-300">
      <IoExtensionPuzzleOutline size={60} />
      <h1 className="mt-4 text-3xl font-bold">Connections Clone</h1>
      <p className="mt-3 w-[50%] text-center text-lg">
        Group words that share a common thread.
      </p>
      <button
        className="mt-6 w-[40%] rounded-full bg-black py-3 font-bold text-white"
        onClick={() => navigate("/game")}
      >
        Play
      </button>
      <p className="mt-6 font-bold">Want to access all of our games?</p>
      <button
        className="mt-3 w-[40%] rounded-full border border-black py-3 font-bold"
        onClick={() => navigate("/signin")}
      >
        Log In
      </button>
      <button
        className="mt-3 w-[40%] rounded-full border border-black py-3 font-bold"
        onClick={() => navigate("/postgame")}
      >
        Leaderboard
      </button>
      <p className="mt-6 font-bold">{getCurrentDate()}</p>
      <p>By Alex Clayton</p>
    </div>
  );
};
