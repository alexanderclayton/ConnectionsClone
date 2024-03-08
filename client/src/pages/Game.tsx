import { useEffect, useState } from "react";
import { GamePiece } from "../components/GamePiece";
import { useNavigate } from "react-router-dom";

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

export type TUser = {
  username: string;
  email: string;
  password: string;
  record: TScore[];
};

type TScore = {
  date: string;
  score: number;
};

export const Game = () => {
  const navigate = useNavigate();
  const [game, setGame] = useState<TGame | undefined>(undefined);
  const [connections, setConnections] = useState<TConnection[] | undefined>(
    undefined,
  );
  const [solution, setSolution] = useState<TGroup | undefined>(undefined);
  const [solutions, setSolutions] = useState<(TGroup | undefined)[]>([]);
  const [selections, setSelections] = useState<TConnection[]>([]);
  const [currentDate, setCurrentDate] = useState("");
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(0);

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
    if (selections.length > 0) {
      if (selections.length < 4) {
        console.log("Must select 4 solutions!");
      } else {
        const group: string[] = [];
        selections.map((selection) => group.push(selection.groupName));
        const groupName = group[0];
        if (group.every((element) => element === groupName)) {
          setSolution({
            groupName: selections[0].groupName,
            itemA: selections[0].connection,
            itemB: selections[1].connection,
            itemC: selections[2].connection,
            itemD: selections[3].connection,
          });
          if (connections !== undefined) {
            const updatedConnections = connections.filter(
              (connection) => !selections.includes(connection),
            );
            setConnections(updatedConnections);
          }
          setSelections([]);
          setCorrect(!correct);
          console.log("correct");
        } else {
          setSelections([]);
          setCorrect(!correct);
          setIncorrect(incorrect + 1);
          console.log("wrong");
        }
      }
    } else {
      console.log("Nothing selected!!");
    }
  };

  const handleCorrect = () => {
    setSolutions((prevSolutions) => [...prevSolutions, solution]);
    setSolution(undefined);
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

  useEffect(() => {
    if (solution !== undefined) {
      handleCorrect();
    }
  }, [correct]);

  return (
    <>
      {incorrect < 4 && (
        <>
          <div className="aspect-4/1 w-full p-4">
            <button
              onClick={() => navigate("/")}
              className="h-full w-full rounded-lg"
            >
              Test
            </button>
            <div className="flex items-center">
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
              <div className="w-full">
                {solutions.map((solution, idx) => (
                  <div
                    key={idx}
                    className="mt-4 flex aspect-8/1 w-full flex-col items-center justify-center rounded-xl bg-red-300"
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
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
      {incorrect === 4 && <h1>Game Over!!!</h1>}
    </>
  );
};
