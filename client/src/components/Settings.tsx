//import//

export const Settings = () => {
  return (
    <div className="flex w-96 flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">Settings</h2>
      <div className="flex w-full justify-between border-b border-gray-300 p-3">
        <h2 className="text-xl font-bold">Feedback</h2>
        <a href="mailto:alexander.clayton.email@gmail.com">Email</a>
      </div>
      <div className="flex w-full justify-between border-b border-gray-300 p-3">
        <h2 className="text-xl font-bold">Report a Bug</h2>
        <a href="mailto:alexander.clayton.email@gmail.com">Email</a>
      </div>
      <div className="flex w-full justify-between p-3">
        <h2 className="text-xl font-bold">Questions</h2>
        <button>FAQ</button>
      </div>
    </div>
  );
};
