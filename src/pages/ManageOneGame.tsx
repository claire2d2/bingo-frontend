import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import bingoApi from "../service/bingoApi";

import Header from "../components/Header";

// Page where a logged in user can create a game, manage an already created game

const ManageOneGame = () => {
  const { gameId } = useParams<string>();
  const [gameData, setGameData] = useState(null);
  const [gameAnecdotes, setGameAnecdotes] = useState(null);

  useEffect(() => {
    fetchGameData();
    fetchGameAnecdotes();
  }, [gameId]);

  async function fetchGameData() {
    try {
      const response = await bingoApi.get(`/games/${gameId}`);
      setGameData(response.data);
      console.log("game", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchGameAnecdotes() {
    try {
      const response = await bingoApi.get(`/anecdotes/${gameId}`);
      setGameAnecdotes(response.data);
      console.log("anecdotes", response.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Header />
      <div>Game where only one game is managed!</div>
    </div>
  );
};

export default ManageOneGame;
