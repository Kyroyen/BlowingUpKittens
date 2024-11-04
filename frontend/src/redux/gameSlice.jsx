// src/redux/gameSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

const initialState = {
  deck: [],
  drawnCards: [],
  defuseAvailable: false,
  gameStatus: "idle",
  username: "",
  shuffle: false,
};

const cardTypes = ["cat", "defuse", "shuffle", "exploding kitten"];

const createDeck = (totalCards) => {
  const deck = [];

  for (let i = 0; i < totalCards; i++) {
    const randomCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    deck.push(randomCard);
  }

  return deck;
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (state, action) => {
      state.username = action.payload.username;
      state.deck = createDeck(5);
      state.drawnCards = [];
      state.defuseAvailable = false;
      state.gameStatus = "playing";
      state.shuffle = false;
    },
    drawCard: (state) => {
      if (state.deck.length === 0 || state.gameStatus !== "playing") return;

      const drawnCard = state.deck.pop();
      state.drawnCards.push(drawnCard);

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

      if (drawnCard === "cat") {
        // Cat card - simply drawn, no action needed.
      } else if (drawnCard === "exploding kitten") {
        if (state.defuseAvailable) {
          state.defuseAvailable = false;
        } else {
          state.gameStatus = "lost";
          postScore(state.username, state.drawnCards.length);
        }
      } else if (drawnCard === "defuse") {
        state.defuseAvailable = true;
      } else if (drawnCard === "shuffle") {
        state.shuffle = true;
        state.deck = createDeck(5);
        state.drawnCards = [];
        state.defuseAvailable = false;
      }

      if (state.deck.length === 0 && state.gameStatus === "playing") {
        state.gameStatus = "won";

        postScore(state.username, state.drawnCards.length);
      }
    },
    resetShuffle: (state) => {
      return { ...state, shuffle: false };
    },
    resetGame: (state) => {
      return { ...initialState, shuffle: state.shuffle };
    },
  },
});

export const { startGame, drawCard, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
