import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const ScoresList = () => {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updatedata = setInterval(() => {
      axiosInstance
        .get("scores")
        .then((response) => {
          setScores(response.data);
        })
        .catch((error) => {
          setError("Failed to fetch scores.");
          console.error("Error fetching scores:", error);
        });
    }, 10000);
    return () => clearInterval(updatedata);
  }, []);

  return (
    <div style={{ padding: "20px" }} className="h-100vh w-full px-9 mx-10">
      <h2 className="text-center text-2xl py-8">Scores List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {scores.map((item, index) => (
          <div
            key={item.username}
            className="w-full border-white border-2 m-2 p-2 rounded-lg bg-radial-gradient from-blue-500 to-purple-600"
          >
            <strong>Username:</strong> {item.username}
            <br />
            <strong>Score:</strong> {item.score}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoresList;
