import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import ManageAllGames from "./pages/ManageAllGames";
import ManageOneGame from "./pages/ManageOneGame";
import CreateGame from "./pages/CreateGame";
import PlayerHomePage from "./pages/PlayerHomePage";
import PlayerIdentification from "./pages/PlayerIdentification";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create-game" element={<CreateGame />} />
        <Route path="/manage-game">
          <Route index element={<ManageAllGames />} />
          <Route path=":gameId" element={<ManageOneGame />} />
        </Route>
        <Route path="/play-game">
          <Route path=":gameId" element={<PlayerHomePage />} />
        </Route>
        <Route path="test" element={<PlayerIdentification />} />
      </Routes>
    </div>
  );
}

export default App;
