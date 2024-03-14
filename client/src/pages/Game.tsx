import { useEffect, useState } from "react";
import { GamePiece } from "../components/GamePiece";
import { useAuth } from "../context";

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
  difficulty: string;
};

export type TConnection = {
  groupName: string;
  connection: string;
  difficulty: string;
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
        .filter((key) => key !== "groupName" && key !== "difficulty")
        .map((item) => ({
          groupName: group.groupName,
          connection: group[item as keyof TGroup],
          difficulty: group.difficulty,
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
            difficulty: selections[0].difficulty,
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
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch game");
      }
      const responseData = await response.json();
      if (responseData.message === "User has already played today's game") {
        setIsPlayed(true);
      } else {
        setGame(responseData);
      }
    } catch (error: unknown) {
      console.error("Error fetching game:", error);
    }
  };

  const addRecord = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/add_record", {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: currentDate,
          score: 5 - incorrect,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update record");
      }
      console.log("updated record");
    } catch (error: unknown) {
      console.error("Error adding record:", error);
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

  useEffect(() => {
    if (solutions.length === 4) {
      console.log("game over correct");
      addRecord();
    } else if (incorrect === 4) {
      console.log("game over incorrect");
      addRecord();
    }
  }, [solutions, incorrect]);

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
                  onClick={() => console.log(solutions)}
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
                onClick={handleSubmit}
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
              >
                Submit
              </button>
            </>
          )}
          {incorrect === 4 ||
            (solutions.length === 4 && (
              <h1 className="mt-4 text-3xl text-red-600">Game Over!!!</h1>
            ))}
        </>
      )}
    </>
  );
};
