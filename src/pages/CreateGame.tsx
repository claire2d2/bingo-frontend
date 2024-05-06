import useAuth from "../context/useAuth";
import bingoApi from "../service/bingoApi";
const CreateGame = () => {
  const { isLoggedIn } = useAuth();

  async function createGame() {
    try {
      const response = await bingoApi.post("/games");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  if (!isLoggedIn) {
    return;
    <div> You must be logged in to view this!</div>;
  }
  return (
    <div>
      <button onClick={createGame}>Create</button>
    </div>
  );
};

export default CreateGame;
