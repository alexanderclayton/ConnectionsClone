import { AiOutlineMenu } from "react-icons/ai";
import { IoMdSettings, IoMdClose } from "react-icons/io";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { useState } from "react";
import { HowToPlay, Settings } from ".";

export const Header = () => {
  const [howTo, setHowTo] = useState(false);
  const [settings, setSettings] = useState(false);
  return (
    <header className="flex h-16 w-full justify-between border-b border-gray-500">
      <div className="flex aspect-square items-center justify-center">
        <AiOutlineMenu size={35} className="hover:cursor-pointer" />
      </div>
      <div className="flex items-center">
        <IoMdSettings
          size={35}
          className="mr-4 hover:cursor-pointer"
          onClick={() => setSettings(!settings)}
        />
        <HiOutlineQuestionMarkCircle
          size={35}
          className="mr-12 hover:cursor-pointer"
          onClick={() => setHowTo(!howTo)}
        />
      </div>
      {settings && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="relative rounded-lg bg-white p-8">
            <IoMdClose
              size={35}
              onClick={() => setSettings(false)}
              className="absolute right-2 top-2 hover:cursor-pointer"
            />
            <Settings />
          </div>
        </div>
      )}
      {howTo && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="relative rounded-lg bg-white p-8">
            <IoMdClose
              size={35}
              onClick={() => setHowTo(false)}
              className="absolute right-2 top-2 hover:cursor-pointer"
            />
            <HowToPlay />
          </div>
        </div>
      )}
    </header>
  );
};
