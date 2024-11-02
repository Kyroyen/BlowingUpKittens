const cors = require('cors');
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

const Redis = require("ioredis");
const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

const SCORES_KEY = "userScores";

app.post("/score", async (req, res) => {
  const { username, score } = req.body;

  if (!username || typeof score !== "number") {
    return res.status(400).json({ error: "Username and score are required" });
  }

  try {
    await redis.zincrby(SCORES_KEY, score, username);
    res.json({ message: "Score updated successfully" });
  } catch (error) {
    console.error("Error updating score:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/scores", async (req, res) => {
  try {
    // Get all scores in descending order
    const scores = await redis.zrevrange(SCORES_KEY, 0, -1, "WITHSCORES");

    // Transform the Redis response into a list of objects
    const scoreList = [];
    for (let i = 0; i < scores.length; i += 2) {
      scoreList.push({
        username: scores[i],
        score: parseFloat(scores[i + 1]),
      });
    }

    res.json(scoreList);
  } catch (error) {
    console.error("Error retrieving scores:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (error) => {
  console.error("Redis connection error:", error);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
