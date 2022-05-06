import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./view/game";
import Main from "./view/main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
