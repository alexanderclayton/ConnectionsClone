import { RiGameLine } from "react-icons/ri";

export const GameMenu = () => {
  return (
    <div className="mt-6 flex flex-col items-start">
      <h2 className="my-1 px-4 font-bold">Cloned NYT Games</h2>
      <div className="flex w-full items-center px-4 py-2 hover:cursor-pointer hover:bg-gray-200">
        <RiGameLine size={25} color="black" />
        <p className="ml-2">The Crossword</p>
      </div>
      <div className="flex w-full items-center px-4 py-2 hover:cursor-pointer hover:bg-gray-200">
        <RiGameLine size={25} color="black" />
        <p className="ml-2">Statistics</p>
      </div>
      <div className="flex w-full items-center px-4 py-2 hover:cursor-pointer hover:bg-gray-200">
        <RiGameLine size={25} color="black" />
        <p className="ml-2">The Mini</p>
      </div>
      <div className="flex w-full items-center px-4 py-2 hover:cursor-pointer hover:bg-gray-200">
        <RiGameLine size={25} color="black" />
        <p className="ml-2">Leaderboards</p>
      </div>
      <div className="flex w-full items-center px-4 py-2 hover:cursor-pointer hover:bg-gray-200">
        <RiGameLine size={25} color="black" />
        <p className="ml-2">Spelling Bee</p>
      </div>
      <div className="flex w-full items-center px-4 py-2 hover:cursor-pointer hover:bg-gray-200">
        <RiGameLine size={25} color="black" />
        <p className="ml-2">Past Puzzles</p>
      </div>
      <div className="flex w-full items-center px-4 py-2 hover:cursor-pointer hover:bg-gray-200">
        <RiGameLine size={25} color="black" />
        <p className="ml-2">Wordle</p>
      </div>
      <div className="flex w-full items-center px-4 py-2 hover:cursor-pointer hover:bg-gray-200">
        <RiGameLine size={25} color="black" />
        <p className="ml-2">Connections</p>
      </div>
      <div className="flex w-full items-center px-4 py-2 hover:cursor-pointer hover:bg-gray-200">
        <RiGameLine size={25} color="black" />
        <p className="ml-2">Tiles</p>
      </div>
      <div className="flex w-full items-center px-4 py-2 hover:cursor-pointer hover:bg-gray-200">
        <RiGameLine size={25} color="black" />
        <p className="ml-2">Letter Boxed</p>
      </div>
      <div className="flex w-full items-center px-4 py-2 hover:cursor-pointer hover:bg-gray-200">
        <RiGameLine size={25} color="black" />
        <p className="ml-2">Vertex</p>
      </div>
      <div className="flex w-full items-center px-4 py-2 hover:cursor-pointer hover:bg-gray-200">
        <RiGameLine size={25} color="black" />
        <p className="ml-2">Strands</p>
        <div className="flex items-center justify-center">
          <p className="ml-2 mt-1 rounded-full bg-blue-400 px-4 text-xs text-white">
            BETA
          </p>
        </div>
      </div>
      <div className="flex w-full px-3 py-1">
        <div className="w-full border-b border-gray-300" />
      </div>
      <div className="flex w-full items-center px-4 py-2 hover:cursor-pointer hover:bg-gray-200">
        <p className="ml-2">Crossword Archives</p>
      </div>
      <div className="flex w-full px-3 py-1">
        <div className="w-full border-b border-gray-300" />
      </div>
      <h2 className="my-1 px-4 font-bold">Other Games</h2>
      <div className="flex w-full items-center px-4 py-2 hover:cursor-pointer hover:bg-gray-200">
        <RiGameLine size={25} color="black" />
        <p className="ml-2">Sudoku</p>
      </div>
      <div className="flex w-full px-3 py-1">
        <div className="w-full border-b border-gray-300" />
      </div>
      <h2 className="my-1 px-4 font-bold">Other Games</h2>
      <div className="flex w-full items-center px-4 py-2 hover:cursor-pointer hover:bg-gray-200">
        <p className="ml-2">Gameplay Stories</p>
      </div>
      <div className="flex w-full items-center px-4 py-2 hover:cursor-pointer hover:bg-gray-200">
        <p className="ml-2">How to solve the NYT Crossword</p>
      </div>
      <div className="flex w-full px-3 py-1">
        <div className="w-full border-b border-gray-300" />
      </div>
      <div className="flex h-16 w-full py-3">
        <button className="mx-4 w-[50%] rounded-sm bg-black text-xs font-bold text-white">
          SUBSCRIBE
        </button>
        <button className="mr-4 w-[50%] rounded-sm border border-black text-xs font-bold">
          LOG IN
        </button>
      </div>
    </div>
  );
};
