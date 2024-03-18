import { useEffect, useState } from "react";
import { GamePiece } from "../components/GamePiece";
import { useAuth } from "../context";
import { TConnection, TGame, TGroup } from "../types";
import {
  addRecord,
  countdownToTomorrow,
  fetchGame,
  formatDate,
  getConnections,
  handleCorrect,
  handleGuess,
  handleResultMessage,
} from "../helpers";

export const Game = () => {
  const { token, logout } = useAuth();
  const [game, setGame] = useState<TGame | undefined>(undefined);
  const [isPlayed, setIsPlayed] = useState(false);
  const [connections, setConnections] = useState<TConnection[] | undefined>(
    undefined,
  );
  const [solution, setSolution] = useState<TGroup | undefined>(undefined);
  const [solutions, setSolutions] = useState<(TGroup | undefined)[]>([]);
  const [selections, setSelections] = useState<TConnection[]>([]);
  const [currentDate, setCurrentDate] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(0);
  const [resultMessage, setResultMessage] = useState("");
  const [tomorrow, setTomorrow] = useState("");

  useEffect(() => {
    formatDate(setCurrentDate);
  }, []);

  useEffect(() => {
    if (currentDate !== "") {
      fetchGame(currentDate, token, setIsPlayed, setGame);
    }
  }, [currentDate]);

  useEffect(() => {
    if (game !== undefined) {
      getConnections(game, setConnections);
    }
  }, [game]);

  useEffect(() => {
    if (solution !== undefined) {
      handleCorrect(solution, setSolution, setSolutions);
    }
  }, [correct]);

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
    <>
      {isPlayed && (
        <div>
          <h2>User Has Already Played Today's Game</h2>
        </div>
      )}
      {!isPlayed && (
        <>
          <div className="flex w-full justify-end">
            <button
              onClick={logout}
              className="rounded-md bg-blue-500 px-4 py-2 text-white"
            >
              Logout
            </button>
          </div>
          {incorrect < 4 && (
            <>
              <div className="aspect-4/1 w-full p-4">
                <button
                  onClick={() => console.log(guesses)}
                  className="h-full w-full rounded-lg bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
                >
                  Test
                </button>
                <div className="mt-2 flex items-center">
                  <h3>{4 - incorrect} guesses left</h3>
                  <div
                    className={`m-4 h-8 w-8 rounded-full border ${incorrect > 0 && "bg-red-600"}`}
                  />
                  <div
                    className={`m-4 h-8 w-8 rounded-full border ${incorrect > 1 && "bg-red-600"}`}
                  />
                  <div
                    className={`m-4 h-8 w-8 rounded-full border ${incorrect > 2 && "bg-red-600"}`}
                  />
                  <div className={`m-4 h-8 w-8 rounded-full border`} />
                </div>
                {solutions.length > 0 && (
                  <div className="mt-4 w-full">
                    {solutions.map((solution, idx) => (
                      <div
                        key={idx}
                        className={`mt-4 flex aspect-8/1 w-full flex-col items-center justify-center rounded-xl ${solution?.difficulty === "easy" ? "bg-yellow-300" : solution?.difficulty === "medium" ? "bg-green-400" : solution?.difficulty === "hard" ? "bg-blue-400" : "bg-purple-400"}`}
                      >
                        <h3>{solution?.groupName}</h3>
                        <div className="flex justify-around">
                          <p>{solution?.itemA}</p>
                          <p>{solution?.itemB}</p>
                          <p>{solution?.itemC}</p>
                          <p>{solution?.itemD}</p>
                        </div>
                      </div>
                    ))}{" "}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-4">
                {connections?.map((connection, idx) => (
                  <GamePiece
                    key={idx}
                    connection={connection}
                    selections={selections}
                    setSelections={setSelections}
                    correct={correct}
                  />
                ))}
              </div>
              <button
                onClick={() =>
                  handleGuess(
                    selections,
                    connections,
                    correct,
                    incorrect,
                    setConnections,
                    setSolution,
                    setGuesses,
                    setSelections,
                    setCorrect,
                    setIncorrect,
                  )
                }
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
              >
                Submit
              </button>
            </>
          )}
          {incorrect === 4 ||
            (solutions.length === 4 && (
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
            ))}
        </>
      )}
    </>
  );
};
