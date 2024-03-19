interface IMistakesProps {
  incorrect: number;
}

export const Mistakes = ({ incorrect }: IMistakesProps) => {
  return (
    <div className="mt-2 flex items-center justify-center">
      <h3 className="mr-2">Mistakes remaining:</h3>
      <div className={`m-2 h-5 w-5 rounded-full border bg-gray-600`} />
      <div
        className={`m-2 h-5 w-5 rounded-full border ${incorrect < 3 && "bg-gray-600"}`}
      />
      <div
        className={`m-2 h-5 w-5 rounded-full border ${incorrect < 4 && "bg-gray-600"}`}
      />
      <div
        className={`m-2 h-5 w-5 rounded-full border ${incorrect === 0 && "bg-gray-600"}`}
      />
    </div>
  );
};
