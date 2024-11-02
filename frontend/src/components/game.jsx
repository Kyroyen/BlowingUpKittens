// src/components/Game.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGame, drawCard, resetGame } from "../redux/gameSlice";
import axiosInstance from "../api/axiosInstance";
import Card from "./card";

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
      postScore(username, drawnCards.length);
    } else if (gameStatus === "lost") {
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
    <div className="text-center py-10 flex flex-col justify-around w-full px-4">
      <h1 className="text-4xl font-bold mb-6">Cat Card Game</h1>
      <div className="py-10 flex flex-col w-full justify-center space-y-7">
        {gameStatus === "idle" && (
          <div className="flex flex-auto justify-center space-x-4">
            <input
              type="text"
              placeholder="Enter your username"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              className="border rounded px-2 py-1 mb-4"
            />
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded"
              onClick={handleStartGame}
            >
              Start Game
            </button>
          </div>
        )}
        {gameStatus === "playing" && (
          <div className="px-20">
            <p className="my-4">Deck has {deck.length} cards left</p>
            <button
            style={{backgroundColor: defuseAvailable? "blue": "green"}}
              className="bg-green-500 text-white px-4 py-2 rounded mb-4"
              onClick={handleDrawCard}
            >
              Draw Card
            </button>
            {defuseAvailable && <p>You have a defuse card available!</p>}
          </div>
        )}
        {(gameStatus === "won" || gameStatus === "lost") && (
          
          <div className="px-20">
            <p className="text-2xl my-4">
              {gameStatus === "won" ? "You won!" : "You lost!"}
            </p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleResetGame}
            >
              Play Again
            </button>
          </div>
        )}
        {gameStatus !== "idle" && (
          <div className="grid grid-cols-5">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i}>
                {i < drawnCards.length ? (
                  <Card type={drawnCards[i]} />
                ) : (
                  <Card type={"?"} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
