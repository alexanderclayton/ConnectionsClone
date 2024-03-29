import { useEffect, useState } from "react";
import {
  deselectAll,
  handleCorrect,
  handleGuess,
  shuffleConnections,
} from "../helpers";
import { TConnection, TGroup } from "../types";

interface IGameButtonsProps {
  connections: TConnection[];
  selections: TConnection[];
  correct: boolean;
  incorrect: number;
  deselect: boolean;
  solutions: (TGroup | undefined)[];
  setConnections: React.Dispatch<
    React.SetStateAction<TConnection[] | undefined>
  >;
  setSelections: React.Dispatch<React.SetStateAction<TConnection[]>>;
  setCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setIncorrect: React.Dispatch<React.SetStateAction<number>>;
  setDeselect: React.Dispatch<React.SetStateAction<boolean>>;
  setSolutions: React.Dispatch<React.SetStateAction<(TGroup | undefined)[]>>;
  setGuesses: React.Dispatch<React.SetStateAction<string[][]>>;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GameButtons = ({
  connections,
  selections,
  correct,
  incorrect,
  deselect,
  solutions,
  setConnections,
  setSelections,
  setCorrect,
  setIncorrect,
  setDeselect,
  setSolutions,
  setGuesses,
  setShowResults,
}: IGameButtonsProps) => {
  const [solution, setSolution] = useState<TGroup | undefined>(undefined);

  useEffect(() => {
    if (solution !== undefined) {
      handleCorrect(solution, setSolution, setSolutions);
    }
  }, [correct]);

  return (
    <>
      {solutions.length !== 4 && incorrect !== 4 ? (
        <div className="flex w-full justify-around p-4">
          <button
            className="rounded-full border border-black px-6 py-3"
            onClick={() => shuffleConnections(connections, setConnections)}
          >
            Shuffle
          </button>
          <button
            className={`rounded-full border px-6 py-3 ${selections.length === 0 ? "border-gray-400 text-gray-400" : "border-black"}`}
            onClick={() => deselectAll(deselect, setSelections, setDeselect)}
            disabled={selections.length > 0 ? false : true}
          >
            Deselect all
          </button>
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
            className={`rounded-full border border-black px-6 py-3 ${selections.length !== 4 ? "border-gray-400 text-gray-400" : "border-black"}`}
            disabled={selections.length !== 4 ? true : false}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="flex w-full justify-center p-4">
          <button
            className="rounded-full border border-black px-8 py-3"
            onClick={() => setShowResults(true)}
          >
            View Results
          </button>
        </div>
      )}
    </>
  );
};
