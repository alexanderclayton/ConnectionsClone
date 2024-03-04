import { useEffect, useState } from "react";

type TGame = {
  _id: string;
  date: string;
  groupEasy: TGroup;
  groupMedium: TGroup;
  groupHard: TGroup;
  groupExpert: TGroup;
};

type TGroup = {
  itemA: string;
  itemB: string;
  itemC: string;
  itemD: string;
};

function App() {
  const [game, setGame] = useState<TGame | undefined>(undefined);

  const fetchGame = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/game/01March2024", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
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
    fetchGame();
  }, []);

  return (
    <>
      <h2 className="font-bold">Hello World</h2>
      {game && (
        <div className="flex flex-col">
          <p className="font-bold">{game._id}</p>
          <p className="font-bold">{game.date}</p>
          <p className="font-bold">{game.groupEasy.toString()}</p>
          <p>{game.groupEasy.itemA}</p>
          <p>{game.groupEasy.itemB}</p>
          <p>{game.groupEasy.itemC}</p>
          <p>{game.groupEasy.itemD}</p>
          <p className="font-bold">{game.groupMedium.toString()}</p>
          <p>{game.groupMedium.itemA}</p>
          <p>{game.groupMedium.itemB}</p>
          <p>{game.groupMedium.itemC}</p>
          <p>{game.groupMedium.itemD}</p>
          <p className="font-bold">{game.groupHard.toString()}</p>
          <p>{game.groupHard.itemA}</p>
          <p>{game.groupHard.itemB}</p>
          <p>{game.groupHard.itemC}</p>
          <p>{game.groupHard.itemD}</p>
          <p className="font-bold">{game.groupExpert.toString()}</p>
          <p>{game.groupExpert.itemA}</p>
          <p>{game.groupExpert.itemB}</p>
          <p>{game.groupExpert.itemC}</p>
          <p>{game.groupExpert.itemD}</p>
        </div>
      )}
    </>
  );
}

export default App;
