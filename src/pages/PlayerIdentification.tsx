import { useState, useEffect } from "react";
import bingoApi from "../service/bingoApi";

type playerLogInType = {
  username: string;
  pinCode: string;
};

type playerType = {
  _id: string;
  name: string;
  grid: number;
  submitted: boolean;
};

type PlayerIdentificationProps = {
  gameId: string;
};

const PlayerIdentification: React.FC<PlayerIdentificationProps> = ({
  gameId,
}) => {
  const [formState, setFormState] = useState<playerLogInType>({
    username: "",
    pinCode: "",
  });
  const [playerData, setPlayerData] = useState<playerType | null>(null);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const key = e.currentTarget.id;
    const value = e.currentTarget.value;
    setFormState({ ...formState, [key]: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(formState);
    identifyPlayer();
  }

  async function identifyPlayer() {
    try {
      const response = await bingoApi.get(
        `/players/${gameId}?username=${formState.username}&pinCode=${formState.pinCode}`
      );
      setPlayerData(response.data);
      localStorage.setItem(gameId, formState.username);
    } catch (error) {
      console.log(error);
      createPlayer();
    }
  }

  async function createPlayer() {
    try {
      const response = await bingoApi.post(`/players/${gameId}`, formState);
      setPlayerData(response.data);
      localStorage.setItem(gameId, formState.username);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(playerData);
  }, [playerData]);

  const { username, pinCode } = formState;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Tu es:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleFormChange}
          value={username}
        />
        <div>Pas d'espace dans le pseudo</div>
        <label htmlFor="pinCode">Code pin :</label>
        <input
          type="number"
          id="pinCode"
          name="pinCode"
          onChange={handleFormChange}
          value={pinCode}
          maxLength={4}
        />
        <button>Aller à mon jeu</button>
      </form>
    </div>
  );
};

export default PlayerIdentification;
