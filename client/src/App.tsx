import { useEffect, useState } from "react";
import { GamePiece } from "./components/GamePiece";

type TGame = {
  _id: string;
  date: string;
  groupEasy: TGroup;
  groupMedium: TGroup;
  groupHard: TGroup;
  groupExpert: TGroup;
};

type TGroup = {
  groupName: string;
  itemA: string;
  itemB: string;
  itemC: string;
  itemD: string;
};

export type TConnection = {
  groupName: string;
  connection: string;
};

function App() {
  const [game, setGame] = useState<TGame | undefined>(undefined);
  const [connections, setConnections] = useState<TConnection[] | undefined>(
    undefined,
  );
  const [currentDate, setCurrentDate] = useState("");
  const selections: TConnection[] = [];

  const getConnections = (game: TGame) => {
    let mappedConnections: TConnection[] = [];
    const groups = [
      "groupEasy",
      "groupMedium",
      "groupHard",
      "groupExpert",
    ] as const;
    for (const groupName of groups) {
      const group = game[groupName];
      const groupConnections = Object.keys(group)
        .filter((key) => key !== "groupName")
        .map((item) => ({
          groupName: group.groupName,
          connection: group[item as keyof TGroup],
        }));
      mappedConnections.push(...groupConnections);
    }
    shuffleConnections(mappedConnections);
  };

  const shuffleConnections = (connections: TConnection[]) => {
    for (let i = connections.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [connections[i], connections[j]] = [connections[j], connections[i]];
    }
    setConnections(connections);
  };

  const handleSubmit = () => {
    const group: string[] = [];
    selections.map((selection) => group.push(selection.groupName));
    const groupName = group[0];
    if (group.every((element) => element === groupName)) {
      console.log("correct");
    } else {
      console.log("wrong");
    }
  };

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

  const formatDate = () => {
    const today = new Date();
    let date = today.getDate().toString();
    const month = months[today.getMonth()].toString();
    const year = today.getFullYear().toString();
    if (parseInt(date) < 10) {
      date = "0" + date;
    }
    setCurrentDate(date + month + year);
  };

  const fetchGame = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/game/${currentDate}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch game");
      }
      const fetchedGame = await response.json();
      setGame(fetchedGame);
    } catch (error: unknown) {
      console.error("Error fetching game:", error);
    }
  };

  useEffect(() => {
    formatDate();
  }, []);

  useEffect(() => {
    if (currentDate !== "") {
      fetchGame();
    }
  }, [currentDate]);

  useEffect(() => {
    if (game !== undefined) {
      getConnections(game);
    }
  }, [game]);

  return (
    <>
      <div className="aspect-4/1 w-full p-4">
        <button
          onClick={() => console.log(currentDate)}
          className="h-full w-full rounded-lg"
        >
          Test
        </button>
      </div>
      <div className="grid grid-cols-4">
        {connections?.map((connection, idx) => (
          <GamePiece
            key={idx}
            connection={connection}
            selections={selections}
          />
        ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

export default App;
