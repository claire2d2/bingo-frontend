import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LogIn from "./pages/LogIn";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </div>
  );
}

export default App;
