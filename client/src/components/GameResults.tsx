import { useEffect, useState } from "react";
import {
  addRecord,
  countdownToTomorrow,
  handleResultMessage,
} from "../helpers";
import { TGroup } from "../types";
import { useAuth } from "../context";

interface IGameResultsProps {
  solutions: (TGroup | undefined)[];
  currentDate: string;
  guesses: string[];
  incorrect: number;
}

export const GameResults = ({
  solutions,
  currentDate,
  guesses,
  incorrect,
}: IGameResultsProps) => {
  const { token } = useAuth();
  const [resultMessage, setResultMessage] = useState("");
  const [tomorrow, setTomorrow] = useState("");

  useEffect(() => {
    if (solutions.length === 4) {
      console.log("game over correct");
      addRecord(currentDate, token, incorrect);
      handleResultMessage(incorrect, setResultMessage);
    } else if (incorrect === 4) {
      console.log("game over incorrect");
      addRecord(currentDate, token, incorrect);
      handleResultMessage(incorrect, setResultMessage);
    }
  }, [solutions, incorrect]);

  useEffect(() => {
    setTimeout(() => {
      countdownToTomorrow(setTomorrow);
    }, 1000);
  }, [tomorrow]);

  return (
    <div>
      <h1 className="mt-4 text-3xl">{resultMessage}</h1>
      {guesses?.map((guess, idx) => (
        <div key={idx} className="flex">
          <div
            className={`my-1 aspect-square w-6 rounded-lg ${guess === "easy" ? "bg-yellow-300" : guess === "medium" ? "bg-green-400" : guess === "hard" ? "bg-blue-400" : guess === "expert" ? "bg-purple-400" : "bg-gray-600"}`}
          />
          <div
            className={`my-1 aspect-square w-6 rounded-lg ${guess === "easy" ? "bg-yellow-300" : guess === "medium" ? "bg-green-400" : guess === "hard" ? "bg-blue-400" : guess === "expert" ? "bg-purple-400" : "bg-gray-600"}`}
          />
          <div
            className={`my-1 aspect-square w-6 rounded-lg ${guess === "easy" ? "bg-yellow-300" : guess === "medium" ? "bg-green-400" : guess === "hard" ? "bg-blue-400" : guess === "expert" ? "bg-purple-400" : "bg-gray-600"}`}
          />
          <div
            className={`my-1 aspect-square w-6 rounded-lg ${guess === "easy" ? "bg-yellow-300" : guess === "medium" ? "bg-green-400" : guess === "hard" ? "bg-blue-400" : guess === "expert" ? "bg-purple-400" : "bg-gray-600"}`}
          />
        </div>
      ))}
      <h2 className="mt-4 text-3xl">{tomorrow}</h2>
    </div>
  );
};
