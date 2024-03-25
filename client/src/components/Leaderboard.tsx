import { useEffect, useState } from "react";
import { TUser } from "../types";
import { useNavigate } from "react-router";

export const Leaderboard = () => {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState<TUser[] | undefined>(undefined);
  const [rankedUsers, setRankedUsers] = useState<TUser[] | undefined>(
    undefined,
  );

  const fetchAllUsers = async () => {
    try {
      const response = await fetch("https://connectionsclone.crabdance.com:5002/get_users", {
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
      setRankedUsers(sortedUsers.slice(0, 10));
    } else {
      console.log("Cannot rank users");
    }
  };

  const leaderboardScore = (user: TUser) => {
    let totalScore = 0;
    user.record.forEach((record) => {
      totalScore += record.score;
    });
    return totalScore;
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
    <div className="flex h-full w-full flex-col items-center bg-purple-300 p-4">
      <h2 className="mt-8 flex w-full items-center justify-center text-2xl font-bold">
        Leaderboard
      </h2>
      {allUsers && (
        <table className="mt-4 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-center">
                Rank
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Username
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Score
              </th>
            </tr>
          </thead>
          {rankedUsers && (
            <tbody>
              {rankedUsers.map((user, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {idx + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {user.username}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {leaderboardScore(user)}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      )}
      <button className="mt-6" onClick={() => navigate("/")}>
        Return Home
      </button>
    </div>
  );
};
