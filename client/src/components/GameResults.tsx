import { useEffect, useState } from "react";
import {
  addRecord,
  countdownToTomorrow,
  handleResultMessage,
} from "../helpers";
import { TGroup } from "../types";
import { useAuth } from "../context";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface IGameResultsProps {
  solutions: (TGroup | undefined)[];
  currentDate: string;
  guesses: string[][];
  incorrect: number;
  showResults: boolean;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GameResults = ({
  solutions,
  currentDate,
  guesses,
  incorrect,
  showResults,
  setShowResults,
}: IGameResultsProps) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [resultMessage, setResultMessage] = useState("");
  const [addResult, setAddResult] = useState(false);
  const [tomorrow, setTomorrow] = useState("");

  useEffect(() => {
    if (addResult !== true) {
      setAddResult(true);
    }
  }, []);

  useEffect(() => {
    if (addResult === true) {
      if (solutions.length === 4 || incorrect === 4) {
        console.log("game over");
        addRecord(currentDate, token, incorrect);
        handleResultMessage(incorrect, setResultMessage);
        setShowResults(true);
      }
    }
  }, [addResult]);

  useEffect(() => {
    setTimeout(() => {
      countdownToTomorrow(setTomorrow);
    }, 1000);
  }, [tomorrow]);

  return (
    <>
      {showResults && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="relative w-96 rounded-lg bg-white p-4">
            <div className="absolute right-2 top-2 flex items-center hover:cursor-pointer">
              <p className="mr-2 pb-1">Back to puzzle</p>
              <IoMdClose size={30} onClick={() => setShowResults(false)} />
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="mb-4 mt-16 text-3xl font-bold">{resultMessage}</h1>
              <h2 className="mb-4 text-center">
                ConnectionsClone <br /> {currentDate}
              </h2>
              {guesses?.map((guess, idx) => (
                <div key={idx} className="flex">
                  <div
                    className={`mt-1 aspect-square w-8 rounded-md ${guess[0] === "easy" ? "bg-yellow-300" : guess[0] === "medium" ? "bg-green-400" : guess[0] === "hard" ? "bg-blue-400" : "bg-purple-400"}`}
                  />
                  <div
                    className={`mt-1 aspect-square w-8 rounded-md ${guess[1] === "easy" ? "bg-yellow-300" : guess[1] === "medium" ? "bg-green-400" : guess[1] === "hard" ? "bg-blue-400" : "bg-purple-400"}`}
                  />
                  <div
                    className={`mt-1 aspect-square w-8 rounded-md ${guess[2] === "easy" ? "bg-yellow-300" : guess[2] === "medium" ? "bg-green-400" : guess[2] === "hard" ? "bg-blue-400" : "bg-purple-400"}`}
                  />
                  <div
                    className={`mt-1 aspect-square w-8 rounded-md ${guess[3] === "easy" ? "bg-yellow-300" : guess[3] === "medium" ? "bg-green-400" : guess[3] === "hard" ? "bg-blue-400" : "bg-purple-400"}`}
                  />
                </div>
              ))}
              <h2 className="text-MD mt-6 text-center font-bold">
                NEXT PUZZLE IN <br />{" "}
                <span className="text-4xl">{tomorrow}</span>
              </h2>
              <div className="mt-4 flex w-full">
                <button className="m-1 w-[50%] rounded-full bg-black px-2 py-3 font-bold text-white">
                  Share Your Results
                </button>
                <button
                  className="m-1 w-[50%] rounded-full bg-black px-2 py-3 font-bold text-white"
                  onClick={() => navigate("/postgame")}
                >
                  Leaderboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
