import { TConnection, TGame, TGroup } from "../types";

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

//Convert current date into string for api calls
export const formatDate = (
    setCurrentDate: React.Dispatch<React.SetStateAction<string>>
) => {
    const today = new Date();
    let date = today.getDate().toString();
    const month = months[today.getMonth()].toString();
    const year = today.getFullYear().toString();
    if (parseInt(date) < 10) {
      date = "0" + date;
    }
    setCurrentDate(date + month + year);
};

//Separate Game object into individual connections
export const getConnections = (
    game: TGame, 
    setConnections: React.Dispatch<React.SetStateAction<TConnection[] | undefined>>
) => {
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
    shuffleConnections(mappedConnections, setConnections);
};

//Shuffle array of connections into random order
export const shuffleConnections = (
    connections: TConnection[], 
    setConnections: React.Dispatch<React.SetStateAction<TConnection[] | undefined>>
) => {
    for (let i = connections.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [connections[i], connections[j]] = [connections[j], connections[i]];
    }
    setConnections(connections);
};

export const deselectAll = (
  deselect: boolean,
  setSelections: React.Dispatch<React.SetStateAction<TConnection[]>>, 
  setDeselect: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setSelections([]);
  setDeselect(!deselect);
};

//Submits guess, handles answer according to accuracy
export const handleGuess = (
    selections: TConnection[],
    connections: TConnection[] | undefined,
    correct: boolean,
    incorrect: number,
    setConnections: React.Dispatch<React.SetStateAction<TConnection[] | undefined>>,
    setSolution: React.Dispatch<React.SetStateAction<TGroup | undefined>>,
    setGuesses: React.Dispatch<React.SetStateAction<string[][]>>,
    setSelections: React.Dispatch<React.SetStateAction<TConnection[]>>,
    setCorrect: React.Dispatch<React.SetStateAction<boolean>>,
    setIncorrect: React.Dispatch<React.SetStateAction<number>>
) => {
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
          setGuesses((prevGuesses) => [
            ...prevGuesses,
            [selections[0].difficulty, selections[1].difficulty, selections[2].difficulty, selections[3].difficulty]
          ]);
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
          setGuesses((prevGuesses) => [
            ...prevGuesses,
            [selections[0].difficulty, selections[1].difficulty, selections[2].difficulty, selections[3].difficulty]
          ]);
          setSelections([]);
          setCorrect(!correct);
          setIncorrect(incorrect + 1);
          console.log("incorrect");
        }
      }
    } else {
      console.log("Nothing selected!!");
    }
};

//Adds correct guess to solutions array
export const handleCorrect = (
    solution: TGroup | undefined,
    setSolution: React.Dispatch<React.SetStateAction<TGroup | undefined>>,
    setSolutions: React.Dispatch<React.SetStateAction<(TGroup | undefined)[]>>
) => {
    setSolutions((prevSolutions) => [...prevSolutions, solution]);
    setSolution(undefined);
};

//Sets result message on game conclusion
export const handleResultMessage = (
    incorrect: number, 
    setResultMessage: React.Dispatch<React.SetStateAction<string>>
) => {
    if (incorrect === 0) {
      setResultMessage("Perfect!");
    } else if (incorrect === 1) {
      setResultMessage("Almost Perfect!");
    } else if (incorrect === 2) {
      setResultMessage("Well Done!");
    } else if (incorrect === 3) {
      setResultMessage("Barely got it!");
    } else {
      setResultMessage("Better luck next time!");
    }
};

//Setup timer countdown to tomorrow
export const countdownToTomorrow = (
    setTomorrow: React.Dispatch<React.SetStateAction<string>>
) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const timeRemaining = tomorrow.getTime() - today.getTime();
    let hours: string | number = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    hours = hours < 10 ? "0" + hours.toString() : hours.toString();
    let minutes: string | number = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
    );
    minutes = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
    let seconds: string | number = Math.floor(
      (timeRemaining % (1000 * 60)) / 1000,
    );
    seconds = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
    setTomorrow(`${hours}:${minutes}:${seconds}`);
};