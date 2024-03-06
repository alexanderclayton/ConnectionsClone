import { useState } from "react";
import { TConnection } from "../App";

interface IGamePieceProps {
  connection: TConnection;
  selections: TConnection[];
}

export const GamePiece = ({ connection, selections }: IGamePieceProps) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    if (!selected) {
      if (selections.length < 4) {
        selections.push(connection);
        setSelected(true);
      } else {
        console.log("User has already selected 4 items");
      }
    } else {
      const index = selections.indexOf(connection);
      selections.splice(index, 1);
      setSelected(false);
    }
  };

  return (
    <div
      id={connection.groupName}
      className={`m-4 flex aspect-square items-center justify-center rounded-lg border hover:cursor-pointer ${selected && "bg-blue-300"}`}
      onClick={handleSelect}
    >
      {connection.connection}
    </div>
  );
};
