import { useState } from "react";

const VotesCount = (props) => {
  const { votes } = props;

  if (votes === 0)
    return (
      <p className="italic text-gray-500 text-sm">- has not been votes yet</p>
    );

  return votes === 1 ? (
    <p className="italic text-gray-500 text-sm">- has {votes} vote</p>
  ) : (
    <p className="italic text-gray-500 text-sm">- has {votes} votes</p>
  );
};

const MostVotedAnecdote = (props) => {
  const { anecdotes, votes } = props;

  const maxVotes = Math.max(...votes);
  if (maxVotes === 0) return null;

  const anecdotesWithMaxVotes = anecdotes.filter(
    (_, index) => votes[index] === maxVotes
  );

  return (
    <footer className="w-full border-t border-t-slate-300 bg-slate-200 p-4">
      <p className="mb-4 font-semibold">Anecdotes with most votes:</p>
      <ul className="mb-4 list-inside list-disc text-sm text-gray-600 italic">
        {anecdotesWithMaxVotes.map((anecdote, index) => (
          <li key={index}>{anecdote}</li>
        ))}
      </ul>
      <VotesCount votes={maxVotes} />
    </footer>
  );
};

export const App = () => {
  const [index, setIndex] = useState(0);
  const [votes, setVotes] = useState([]);

  const handleBtnNext = () => {
    const length = anecdotes.length;
    let randomNumber = Math.floor(Math.random() * length);
    setIndex(randomNumber);
  };

  const handleBtnVote = () => {
    votes[index] += 1;
    setVotes([...votes]);
  };

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

  if (votes.length === 0) {
    setVotes(new Array(anecdotes.length).fill(0));
  }

  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center bg-slate-100">
      <div className="flex max-w-lg flex-col items-center overflow-hidden rounded-2xl border border-slate-300 shadow-md">
        <div className="space-y-4 p-8">
          <h1 className="text-xl font-bold">Tech anecdotes</h1>
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
        <MostVotedAnecdote anecdotes={anecdotes} votes={votes} />
      </div>
    </div>
  );
};
