import React, { useEffect, useState } from "react";
import { TConnection } from "../types";

interface IGamePieceProps {
  connection: TConnection;
  selections: TConnection[];
  setSelections: React.Dispatch<React.SetStateAction<TConnection[]>>;
  deselect: boolean;
  correct: boolean;
}

export const GamePiece = ({
  connection,
  selections,
  setSelections,
  deselect,
  correct,
}: IGamePieceProps) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    if (!selected) {
      if (selections.length < 4) {
        setSelections((prevSelections) => [...prevSelections, connection]);
        setSelected(true);
      } else {
        console.log("User has already selected 4 items");
      }
    } else {
      setSelections((prevSelections) =>
        prevSelections.filter((sel) => sel !== connection),
      );
      setSelected(false);
    }
  };

  useEffect(() => {
    setSelected(false);
  }, [correct, deselect]);

  return (
    <div
      id={connection.groupName}
      className={`m-1 flex aspect-square items-center justify-center rounded-xl border text-center transition-colors duration-300 hover:cursor-pointer ${selected ? "bg-blue-300" : "bg-gray-200 hover:bg-blue-100"}`}
      onClick={handleSelect}
    >
      {connection.connection}
    </div>
  );
};
