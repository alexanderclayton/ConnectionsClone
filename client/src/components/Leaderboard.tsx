import { useEffect, useState } from "react";
import { TUser } from "../pages";

export const Leaderboard = () => {
  const [allUsers, setAllUsers] = useState<TUser[] | undefined>(undefined);
  const [rankedUsers, setRankedUsers] = useState<TUser[] | undefined>(
    undefined,
  );

  const fetchAllUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get_users", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const responseData = await response.json();
      let userArray = responseData.users;
      setAllUsers(userArray);
    } catch (error: unknown) {
      console.error("Error fetching users:", error);
    }
  };

  const rankUsers = () => {
    if (allUsers) {
      let sortedUsers = [...allUsers];
      sortedUsers.sort((a, b) => {
        let totalScoreA = 0;
        let totalScoreB = 0;
        a.record.forEach((record) => {
          totalScoreA += record.score;
        });
        b.record.forEach((record) => {
          totalScoreB += record.score;
        });
        return totalScoreB - totalScoreA;
      });
      setRankedUsers(sortedUsers);
    } else {
      console.log("Cannot rank users");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (allUsers) {
      rankUsers();
    }
  }, [allUsers]);

  return (
    <div>
      <button onClick={() => console.log(rankedUsers)}>Leaderboard</button>
    </div>
  );
};
