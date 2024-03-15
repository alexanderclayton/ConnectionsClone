//import//

export const HowToPlay = () => {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold">How to Play</h2>
      <p className="text-lg">
        Find groups of four items that share something in common.
      </p>
      <p>
        • Select four items and tap <span className="font-bold">'Submit</span>{" "}
        to check if your guess is correct.
      </p>
      <p>• Find the groups without making 4 mistakes!</p>
      <h3 className="font-bold">Category Examples</h3>
      <p>• FISH: Bass, Flounder, Salmon, Trout</p>
      <p>• FIRE _____: Ant, Drill, Island, Opal</p>
      <p>
        Categories will always be mre specific than "5-LETTER-WORDS," "NAMES" or
        "VERBS."
      </p>
      <p>
        Each puzzle has exactly one solution. <br />
        Watch out for words that seem to belong to multiple categories!
      </p>
      <p>Each group is assigned a color, which will be reealed as you solve:</p>
      <div className="flex">
        <div className="m-1 aspect-square w-6 rounded-sm bg-yellow-300" />
        <p>Straightforward</p>
      </div>
      <div className="m-1 aspect-square w-6 rounded-sm bg-green-400" />
      <div className="m-1 aspect-square w-6 rounded-sm bg-blue-300" />
      <div className="flex">
        <div className="m-1 aspect-square w-6 rounded-sm bg-purple-400" />
        <p>Tricky</p>
      </div>
    </div>
  );
};
