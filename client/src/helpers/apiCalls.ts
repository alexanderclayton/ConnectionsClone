import { TGame } from "../types";


//Fetches today's game from MongoDB
export const fetchGame = async (
    currentDate: string, 
    token: string | null, 
    setIsPlayed: React.Dispatch<React.SetStateAction<boolean>>, 
    setGame: React.Dispatch<React.SetStateAction<TGame | undefined>>
) => {
    try {
      const response = await fetch(
        `http://64.23.175.1:5002/game/${currentDate}`,
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

//Adds game score to User.record in MongoDB
export const addRecord = async (
    currentDate: string, 
    token: string | null, 
    incorrect: number
) => {
    try {
      const response = await fetch("http://64.23.175.1:5002/add_record", {
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
      const responseData = await response.json()
      if (responseData.error === "User has already recorded score for today's date") {
        console.log("duplicate record")
      } else {
        console.log("updated record");
      }
    } catch (error: unknown) {
      console.error("Error adding record:", error);
    }
};