import { useState, useEffect } from "react";
import bingoApi from "../service/bingoApi";
import Anecdote from "../components/Anecdote";

type playerDataType = {
  _id: string;
  username: string;
};

type anecdoteType = {
  _id: string;
  anecdote: {
    title: string;
  };
  proposition: string;
};

type PlayerGameProps = {
  gameId: string;
};
const PlayerGame: React.FC<PlayerGameProps> = ({ gameId }) => {
  //TODO if game isn't launched, say it isn't launched
  //TODO if game doesn't exist
  const [playerData, setPlayerData] = useState<playerDataType | null>(null);
  const [gameAnecdotes, setGameAnecdotes] = useState<anecdoteType[]>([]);

  const playerUsername = localStorage.getItem(gameId);
  // fetch game data and its related anecdotes

  useEffect(() => {
    fetchPlayerData();
  }, []);

  useEffect(() => {
    fetchGameAnecdotes();
  }, [playerData]);

  async function fetchPlayerData() {
    try {
      const response = await bingoApi.get<playerDataType>(
        `/players/fetchPlayer?username=${playerUsername}&game=${gameId}`
      );
      console.log(playerData);
      setPlayerData(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchGameAnecdotes() {
    try {
      const response = await bingoApi.get(`/bingocells/all/${playerData?._id}`);
      setGameAnecdotes(response.data);
      console.log("initial anecdotes", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // if no game exists
  if (!gameAnecdotes) {
    return <div>Ce jeu n'existe pas ...</div>;
  }

  return (
    <div className="overflow-scroll flex flex-col gap-3">
      <h1>Birthday Bingo!</h1>

      <div className="w-full grid grid-cols-5">
        {gameAnecdotes?.map((anecdote) => {
          return <Anecdote title={anecdote.anecdote.title} />;
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
