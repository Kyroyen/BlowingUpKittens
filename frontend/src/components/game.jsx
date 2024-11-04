// src/components/Game.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGame, drawCard, resetGame } from "../redux/gameSlice";
import Card from "./card";
import Toast from "./toast";

const Game = () => {
  const dispatch = useDispatch();
  const { deck, drawnCards, defuseAvailable, gameStatus, username, shuffle } =
    useSelector((state) => state.game);

  const [toasts, setToasts] = useState([]);

  // Function to add a new toast to the list
  const addToast = (message) => {
    const newToast = {
      id: Date.now(), // Unique ID for each toast
      message,
    };
    setToasts([...toasts, newToast]);
  };

  useEffect(()=>{
    if(shuffle){
      addToast("Cards shuffled!");
    }
  }, [shuffle]);

  const removeToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

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
      addToast(`Congratulations! ${inputUsername} you have won the game!`);
    } else if (gameStatus === "lost") {
      addToast(`Better luck next time ${inputUsername}!`);
    }
  }, [gameStatus, username]);

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
              className="border rounded px-6 py-4"
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
              style={{ backgroundColor: defuseAvailable ? "blue" : "green" }}
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
      <div className="fixed bottom-5 right-0 left-0 m-auto space-y-2 flex flex-row justify-center items-start">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            onClose={removeToast}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
