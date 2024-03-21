import { TGroup } from "../types";

interface ISolutionsProps {
  solutions: (TGroup | undefined)[];
}

export const Solutions = ({ solutions }: ISolutionsProps) => {
  return (
    <div className="mt-4 w-full">
      {solutions.map((solution, idx) => (
        <div
          key={idx}
          className={`mt-2 flex h-[86px] w-full flex-col items-center justify-center rounded-xl ${solution?.difficulty === "easy" ? "bg-yellow-300" : solution?.difficulty === "medium" ? "bg-green-400" : solution?.difficulty === "hard" ? "bg-blue-400" : "bg-purple-400"}`}
        >
          <h3 className="font-bold">{solution?.groupName.toUpperCase()}</h3>
          <div className="flex justify-around">
            <p>
              {solution?.itemA}, {solution?.itemB}, {solution?.itemC},{" "}
              {solution?.itemD}
            </p>
          </div>
        </div>
      ))}{" "}
    </div>
  );
};
