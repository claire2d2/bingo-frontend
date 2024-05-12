import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import bingoApi from "../service/bingoApi";

import Header from "../components/Header";
import { HiMiniPencil, HiMiniTrash, HiCheck } from "react-icons/hi2";

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

// Page where a logged in user can create a game, manage an already created game

const ManageOneGame = () => {
  const { gameId } = useParams<string>();
  const [gameData, setGameData] = useState<gameType | null>(null);
  const [gameAnecdotes, setGameAnecdotes] = useState<anecdoteType[]>([]);
  const [initAnecdotes, setInitAnecdotes] = useState<anecdoteType[]>([]);
  const [editGameAnecdotes, setEditGameAnecdotes] = useState<boolean[]>([]);
  const [oneAnecdote, setOneAnecdote] = useState<string>("");
  // fetch game data and its related anecdotes
  useEffect(() => {
    fetchGameData();
    fetchGameAnecdotes();
  }, []);

  async function fetchGameData() {
    try {
      const response = await bingoApi.get(`/games/${gameId}`);
      setGameData(response.data);
      console.log("game", response.data);
      // TODO redirect if game creator isn't logged in user
    } catch (error) {
      console.log(error);
    }
  }

  /* when initial anecdotes are fetched from the Api:
   ** - set game anecdotes to them
   ** - create an array of booleans (which will enable editing each anecdote individually)
   */
  useEffect(() => {
    setGameAnecdotes(initAnecdotes);
    const array = [];
    for (let i = 0; i < initAnecdotes.length; i++) {
      array.push(false);
    }
    setEditGameAnecdotes(array);
  }, [initAnecdotes]);

  async function fetchGameAnecdotes() {
    try {
      const response = await bingoApi.get(`/anecdotes/${gameId}`);
      setInitAnecdotes(response.data);
      console.log("initial anecdotes", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // edit an anecdote

  function setEditMode(index: number, id: string) {
    const copy = [...editGameAnecdotes];
    if (editGameAnecdotes[index]) {
      copy[index] = false;
      editAnecdote(id, gameAnecdotes[index].title);
    } else {
      copy[index] = true;
    }
    setEditGameAnecdotes(copy);
  }

  function handleEditChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    id: string
  ) {
    const value = e.currentTarget.value;
    const copy = [...gameAnecdotes];
    copy[index] = {
      _id: id,
      title: value,
    };
    setGameAnecdotes(copy);
  }

  async function editAnecdote(id: string, newAnecdote: string) {
    try {
      const response = await bingoApi.put(`/anecdotes/one/${id}`, {
        title: newAnecdote,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  // add a new anecdote
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    setOneAnecdote(value);
  }

  async function addAnecdote(newAnecdote: string) {
    try {
      const response = await bingoApi.post("/anecdotes", {
        game: gameId,
        title: newAnecdote,
      });
      setGameAnecdotes([...gameAnecdotes, response.data]);
      const copy = [...editGameAnecdotes];
      copy.push(false);
      setEditGameAnecdotes(copy);
    } catch (error) {
      console.log(error);
    }
    setOneAnecdote("");
  }

  // delete an anecdote

  async function deleteAnecdote(index: number, id: string) {
    try {
      const response = await bingoApi.delete(`/anecdotes/one/${id}`);
      console.log(response.data);
      const copy = [...gameAnecdotes];
      copy.splice(index, 1);
      setGameAnecdotes(copy);
    } catch (error) {
      console.log(error);
    }
  }

  // launch the game

  async function launchGame(isLaunched: boolean) {
    try {
      let status: boolean;
      if (isLaunched) {
        status = false;
      } else {
        status = true;
      }
      const response = await bingoApi.put(`/games/${gameId}`, {
        launched: status,
      });
      fetchGameData();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (!gameData) {
    return <div>Loading!</div>;
  }
  return (
    <div>
      <Header />
      <div className="flex">
        {gameData?.name} <HiMiniPencil />
      </div>

      <div>
        <p>Grille:</p>
        <p>
          {gameData?.grid} x {gameData?.grid}
        </p>
      </div>
      <div>
        <ul>
          {gameAnecdotes?.map((anecdote, index) => {
            return (
              <li
                key={index}
                className="flex justify-between border border-gray-100"
              >
                <div>
                  {editGameAnecdotes[index] ? (
                    <input
                      type="text"
                      value={anecdote.title}
                      onChange={(e) => handleEditChange(e, index, anecdote._id)}
                    />
                  ) : (
                    <div>{anecdote.title}</div>
                  )}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setEditMode(index, anecdote._id)}>
                    {editGameAnecdotes[index] ? <HiCheck /> : <HiMiniPencil />}
                  </button>
                  <button onClick={() => deleteAnecdote(index, anecdote._id)}>
                    <HiMiniTrash />
                  </button>
                </div>
              </li>
            );
          })}
          <li>
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
          </li>
        </ul>
      </div>
      <button
        onClick={() => launchGame(gameData.launched)}
        disabled={
          (gameData?.grid === 5 && gameAnecdotes.length < 5) ||
          (gameData?.grid === 4 && gameAnecdotes.length < 15) ||
          (gameData?.grid === 3 && gameAnecdotes.length < 8)
        }
        className="bg-blue-500 disabled:bg-slate-400"
      >
        {gameData?.launched ? "Archiver le jeu" : "Lancer le jeu"}
      </button>
      <button>Supprimer le jeu</button>
    </div>
  );
};

export default ManageOneGame;
