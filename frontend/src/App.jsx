// src/App.js
import React from "react";
import Game from "./components/game";
import ScoresList from "./components/scores";

function App() {
  return (
    <div className="App">
      <Game />
      <ScoresList/>
    </div>
  );
}

export default App;
