import { useState } from "react";
import useAuth from "../context/useAuth";
import bingoApi from "../service/bingoApi";

type gameType = {
  _id: string;
};

const CreateGame = () => {
  const { isLoggedIn } = useAuth();
  //   const [newGame, setNewGame] = useState(null);
  const [oneAnecdote, setOneAnecdote] = useState<string>("");
  const [anecdotes, setAnecdotes] = useState<string[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    setOneAnecdote(value);
  }

  function addAnecdote(newAnecdote: string) {
    setAnecdotes([...anecdotes, newAnecdote]);
    setOneAnecdote("");
  }

  async function createGame() {
    try {
      const response = await bingoApi.post<gameType>("/games");
      console.log(response);
      const createdAnecdotes = anecdotes.map(async (anecdote) => {
        await bingoApi.post("/anecdotes", {
          game: response.data._id,
          title: anecdote,
        });
      });
      await Promise.all(createdAnecdotes);
    } catch (error) {
      console.log(error);
    }
  }
  if (!isLoggedIn) {
    return;
    <div> Tu dois être connecté pour pouvoir créer un jeu !</div>;
  }
  return (
    <div>
      <div>Renseigne 25 anecdotes avant de créer ton bingo</div>
      <button
        onClick={createGame}
        disabled={anecdotes.length < 2}
        className="bg-blue-500 disabled:bg-gray-600"
      >
        Créer
      </button>

      <form action="">
        <div className="flex flex-col">
          <label htmlFor="anecdote">Rajouter une anecdote: </label>
          <div>
            <input
              type="text"
              id="anecdote"
              value={oneAnecdote}
              onChange={handleChange}
              maxLength={100}
            />
            <button type="button" onClick={() => addAnecdote(oneAnecdote)}>
              +
            </button>
          </div>
        </div>
        <div>Anecdotes déjà rajoutées</div>
        {anecdotes.map((anecdote, index) => {
          return (
            <div key={index}>
              <div>Anecdote #{index + 1}</div>
              <div>{anecdote}</div>
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default CreateGame;
