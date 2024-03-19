import { useEffect, useState } from "react";
import { TConnection, TGame, TGroup } from "../types";
import { getConnections } from "../helpers";
import { GameButtons, GamePiece, Mistakes, Solutions } from ".";

interface IGameBoardProps {
  game: TGame | undefined;
  solutions: (TGroup | undefined)[];
  incorrect: number;
  setSolutions: React.Dispatch<React.SetStateAction<(TGroup | undefined)[]>>;
  setIncorrect: React.Dispatch<React.SetStateAction<number>>;
  setGuesses: React.Dispatch<React.SetStateAction<string[]>>;
}

export const GameBoard = ({
  game,
  solutions,
  incorrect,
  setSolutions,
  setIncorrect,
  setGuesses,
}: IGameBoardProps) => {
  const [connections, setConnections] = useState<TConnection[] | undefined>(
    undefined,
  );
  const [selections, setSelections] = useState<TConnection[]>([]);
  const [deselect, setDeselect] = useState(false);
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    if (game !== undefined) {
      getConnections(game, setConnections);
    }
  }, [game]);

  return (
    <>
      <div className="w-full p-4">
        <h2 className="text-center">Create four groups of four!</h2>
        {solutions.length > 0 && <Solutions solutions={solutions} />}
      </div>
      <div className="grid grid-cols-4 p-1">
        {connections?.map((connection, idx) => (
          <GamePiece
            key={idx}
            connection={connection}
            selections={selections}
            setSelections={setSelections}
            deselect={deselect}
            correct={correct}
          />
        ))}
      </div>
      <Mistakes incorrect={incorrect} />
      {connections && (
        <GameButtons
          connections={connections}
          selections={selections}
          correct={correct}
          incorrect={incorrect}
          deselect={deselect}
          setConnections={setConnections}
          setSelections={setSelections}
          setCorrect={setCorrect}
          setIncorrect={setIncorrect}
          setDeselect={setDeselect}
          setSolutions={setSolutions}
          setGuesses={setGuesses}
        />
      )}
    </>
  );
};
