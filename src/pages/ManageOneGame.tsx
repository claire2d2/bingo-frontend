import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import bingoApi from "../service/bingoApi";

import Header from "../components/Header";
import { HiMiniPencil, HiMiniTrash, HiCheck } from "react-icons/hi2";

type gameType = {
  _id: string;
  name: string;
  grid: number;
};

type anecdoteType = {
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
  }, [gameId]);

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

  function editAnecdote(index: number) {
    const copy = [...editGameAnecdotes];
    if (editGameAnecdotes[index]) {
      copy[index] = false;
    } else {
      copy[index] = true;
    }
    setEditGameAnecdotes(copy);
    console.log(editGameAnecdotes);
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
    } catch (error) {
      console.log(error);
    }
    setOneAnecdote("");
  }
  return (
    <div>
      <Header />
      <div>{gameData?.name}</div>
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
                    <input type="text" />
                  ) : (
                    <div>{anecdote.title}</div>
                  )}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => editAnecdote(index)}>
                    {editGameAnecdotes[index] ? <HiCheck /> : <HiMiniPencil />}
                  </button>
                  <button>
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

      <button>Delete game</button>
    </div>
  );
};

export default ManageOneGame;
