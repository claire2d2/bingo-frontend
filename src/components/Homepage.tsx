const Homepage = () => {
  const array: string[] = [];
  for (let i = 0; i < 25; i++) {
    array.push(`Anecdote ${i + 1}`);
  }
  return (
    <div>
      <h1>Birthday Bingo!</h1>

      <div className="grid grid-cols-5">
        {array.map((anecdote) => {
          return <div className="p-3 text-xs bg-slate-200">{anecdote}</div>;
        })}
      </div>
    </div>
  );
};

export default Homepage;
