import React, { useEffect, useState } from "react";
import { TConnection } from "../types";

interface IGamePieceProps {
  connection: TConnection;
  selections: TConnection[];
  setSelections: React.Dispatch<React.SetStateAction<TConnection[]>>;
  correct: boolean;
}

export const GamePiece = ({
  connection,
  selections,
  setSelections,
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
  }, [correct]);

  return (
    <div
      id={connection.groupName}
      className={`m-4 flex aspect-square items-center justify-center rounded-xl border transition-colors duration-300 hover:cursor-pointer ${selected ? "bg-blue-300" : "hover:bg-blue-100"}`}
      onClick={handleSelect}
    >
      {connection.connection}
    </div>
  );
};
