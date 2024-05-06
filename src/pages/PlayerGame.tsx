import Anecdote from "../components/Anecdote";
import anecdotesList from "../assets/anecdotes.json";

const PlayerGame = () => {
  return (
    <div className="overflow-scroll flex flex-col gap-3">
      <h1>Birthday Bingo!</h1>

      <div className="w-full grid grid-cols-5">
        {anecdotesList.map((anecdote) => {
          return <Anecdote title={anecdote.name} />;
        })}
      </div>

      <div className="w-full flex justify-center gap-5">
        <button className="w-1/5 bg-cyan-700 text-white">Enregistrer</button>
        <button
          disabled
          className="w-1/5 bg-blue-700 text-white disabled:bg-gray-400"
        >
          Soumettre
        </button>
      </div>
      <div>O personnes ont soumis une réponse .... a gagné !</div>
    </div>
  );
};

export default PlayerGame;
