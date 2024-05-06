import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import ManageGame from "./pages/ManageGame";
import CreateGame from "./pages/CreateGame";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create-game" element={<CreateGame />} />
        <Route path="/manage-game" element={<ManageGame />} />
      </Routes>
    </div>
  );
}

export default App;
