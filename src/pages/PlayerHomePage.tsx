import { useParams } from "react-router-dom";
import PlayerGame from "./PlayerGame";
import PlayerIdentification from "./PlayerIdentification";

// if in local storage, player then display game

// if not, identify

const PlayerHomePage = () => {
  const { gameId } = useParams<string>();
  if (gameId) {
    const isIdentified = localStorage.getItem(gameId);

    if (isIdentified) {
      return <PlayerGame gameId={gameId} />;
    }

    return <PlayerIdentification gameId={gameId} />;
  }
};

export default PlayerHomePage;
