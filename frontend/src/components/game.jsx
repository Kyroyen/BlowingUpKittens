// src/components/Game.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGame, drawCard, resetGame } from "../redux/gameSlice";
import axiosInstance from "../api/axiosInstance";

const Game = () => {
  const dispatch = useDispatch();
  const { deck, drawnCards, defuseAvailable, gameStatus, username } =
    useSelector((state) => state.game);

  const [inputUsername, setInputUsername] = useState("");
  const handleStartGame = () => {
    if (inputUsername.trim() === "") {
      alert("Please enter a valid username.");
      return;
    }
    dispatch(startGame({ username: inputUsername }));
  };
  const handleDrawCard = () => dispatch(drawCard());
  const handleResetGame = () => dispatch(resetGame());

  useEffect(() => {
    if (gameStatus === "won") {
      alert(`Congratulations, ${username}! You've won the game!`);
      postScore(username, drawnCards.length);
    } else if (gameStatus === "lost") {
      alert(`Game Over, ${username}! You lost the game.`);
      postScore(username, drawnCards.length);
    }
  }, [gameStatus, username]);

  
  const postScore = async (username, score) => {
    try {
      const response = await axiosInstance.post("score", {
        username,
        score,
      });
      console.log("Score posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting score:", error);
    }
  };

  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold mb-6">Single-Player Card Game</h1>
      {gameStatus === "idle" && (
        <>
          <input
            type="text"
            placeholder="Enter your username"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            className="border rounded px-2 py-1 mb-4"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleStartGame}
          >
            Start Game
          </button>
        </>
      )}
      {gameStatus === "playing" && (
        <>
          <p className="my-4">Deck has {deck.length} cards left</p>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            onClick={handleDrawCard}
          >
            Draw Card
          </button>
        </>
      )}
      {(gameStatus === "won" || gameStatus === "lost") && (
        <>
          <p className="text-2xl my-4">
            {gameStatus === "won" ? "You won!" : "You lost!"}
          </p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleResetGame}
          >
            Play Again
          </button>
        </>
      )}
      <div className="my-4">
        <h2 className="text-xl font-semibold">Drawn Cards:</h2>
        <ul className="list-disc list-inside">
          {drawnCards.map((card, index) => (
            <li key={index}>{card}</li>
          ))}
        </ul>
      </div>
      {defuseAvailable && <p>You have a defuse card available!</p>}
    </div>
  );
};

export default Game;
