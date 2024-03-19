import { useEffect, useState } from "react";
import { useAuth } from "../context";
import { TGame, TGroup } from "../types";
import { fetchGame, formatDate } from "../helpers";
import { GameBoard, GameResults, Header } from "../components";
import { Navigate } from "react-router-dom";

export const Game = () => {
  const { token } = useAuth();
  const [game, setGame] = useState<TGame | undefined>(undefined);
  const [isPlayed, setIsPlayed] = useState(false);
  const [solutions, setSolutions] = useState<(TGroup | undefined)[]>([]);
  const [currentDate, setCurrentDate] = useState("");
  const [guesses, setGuesses] = useState<string[][]>([]);
  const [incorrect, setIncorrect] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    formatDate(setCurrentDate);
  }, []);

  useEffect(() => {
    if (currentDate !== "") {
      fetchGame(currentDate, token, setIsPlayed, setGame);
    }
  }, [currentDate]);

  return (
    <>
      <Header />
      <main>
        {isPlayed ? (
          <Navigate to="/postgame" />
        ) : (
          <>
            {incorrect < 4 && (
              <GameBoard
                game={game}
                solutions={solutions}
                incorrect={incorrect}
                setSolutions={setSolutions}
                setIncorrect={setIncorrect}
                setGuesses={setGuesses}
                setShowResults={setShowResults}
              />
            )}
            {incorrect === 4 ||
              (solutions.length === 4 && (
                <GameResults
                  solutions={solutions}
                  currentDate={currentDate}
                  guesses={guesses}
                  incorrect={incorrect}
                  showResults={showResults}
                  setShowResults={setShowResults}
                />
              ))}
          </>
        )}
      </main>
    </>
  );
};
