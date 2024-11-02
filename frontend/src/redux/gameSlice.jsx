// src/redux/gameSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deck: [],
  drawnCards: [],
  defuseAvailable: false,
  gameStatus: "idle",
  username: '',
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
    },
    drawCard: (state) => {
      if (state.deck.length === 0 || state.gameStatus !== "playing") return;

      const drawnCard = state.deck.pop();
      state.drawnCards.push(drawnCard);

      if (drawnCard === "cat") {
        // Cat card - simply drawn, no action needed.
      } else if (drawnCard === "exploding kitten") {
        if (state.defuseAvailable) {
          state.defuseAvailable = false; 
        } else {
          state.gameStatus = "lost"; 
        }
      } else if (drawnCard === "defuse") {
        state.defuseAvailable = true;
      } else if (drawnCard === "shuffle") {
        state.deck = createDeck(5);
        state.drawnCards = [];
        state.defuseAvailable = false;
      }

      if (state.deck.length === 0 && state.gameStatus === "playing") {
        state.gameStatus = "won";
      }
    },
    resetGame: (state) => {
      return initialState;
    },
  },
});

export const { startGame, drawCard, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
