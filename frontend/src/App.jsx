// src/App.js
import React from "react";
import Game from "./components/game";
import ScoresList from "./components/scores";

function App() {
  return (
    <div className="App grid grid-cols-4 flex flex-row w-full h-full">
      <div className="col-span-3 flex w-full items-start justify-center">
        <Game />
      </div>
      <div className="col-span-1 flex w-full items-start justify-center">
        <ScoresList />
      </div>
    </div>
  );
}

export default App;
