import { useState } from "react";

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];

const VotesCount = (props) => {
  const { votes } = props;
  return votes ? (
    <p className="italic text-gray-500 text-sm">- has {votes} votes</p>
  ) : (
    <p className="italic text-gray-500 text-sm">- has not been votes yet</p>
  );
};

export const App = () => {
  const [index, setIndex] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleBtnNext = () => {
    const length = anecdotes.length;
    let randomNumber = Math.floor(Math.random() * length);
    setIndex(randomNumber);
  };

  const handleBtnVote = () => {
    votes[index] += 1;
    setVotes([...votes]);
  };

  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center bg-slate-100">
      <div className="flex max-w-lg flex-col items-center rounded-2xl border border-slate-300 p-8 shadow-md">
        <div className="space-y-4">
          <h4 className="text-xl font-bold">Tech anecdotes</h4>
          <p className="text-gray-600">{anecdotes[index]}</p>
          <VotesCount votes={votes[index]} />
          <hr />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="inline-flex cursor-pointer items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-xs leading-4 font-medium tracking-wider text-white shadow-sm hover:bg-green-700"
              onClick={handleBtnVote}
            >
              Vote
            </button>
            <button
              type="button"
              className="inline-flex cursor-pointer items-center rounded-md border border-transparent bg-gray-800 px-3 py-2 text-xs tracking-wider leading-4 font-medium text-white shadow-sm hover:bg-gray-900"
              onClick={handleBtnNext}
            >
              Next anecdote →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
