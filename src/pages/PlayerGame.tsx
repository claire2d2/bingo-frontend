import { useState, useEffect } from "react";
import bingoApi from "../service/bingoApi";
import Anecdote from "../components/Anecdote";

type gameType = {
  _id: string;
  name: string;
  grid: number;
  launched: boolean;
};

type anecdoteType = {
  _id: string;
  title: string;
};

type PlayerGameProps = {
  gameId: string;
};
const PlayerGame: React.FC<PlayerGameProps> = ({ gameId }) => {
  //TODO if game isn't launched, say it isn't launched
  //TODO if game doesn't exist

  const [gameData, setGameData] = useState<gameType | null>(null);
  const [gameAnecdotes, setGameAnecdotes] = useState<anecdoteType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // fetch game data and its related anecdotes
  useEffect(() => {
    fetchGameData();
    fetchGameAnecdotes();
  }, []);

  async function fetchGameData() {
    try {
      setIsLoading(false);
      const response = await bingoApi.get(`/games/${gameId}`);
      setGameData(response.data);
      // TODO redirect if game creator isn't logged in user
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchGameAnecdotes() {
    try {
      const response = await bingoApi.get(`/anecdotes/${gameId}`);
      setGameAnecdotes(response.data);
      console.log("initial anecdotes", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // if data is loading
  if (isLoading && !gameData) {
    return <div>Game loading</div>;
  }

  // if no game exists
  if (!gameData) {
    return <div>Ce jeu n'existe pas ...</div>;
  }

  return (
    <div className="overflow-scroll flex flex-col gap-3">
      <h1>Birthday Bingo!</h1>
      <div>{gameData?.name}</div>

      <div className="w-full grid grid-cols-5">
        {gameAnecdotes?.map((anecdote) => {
          return <Anecdote title={anecdote.title} />;
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
