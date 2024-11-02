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
    <div style={{ padding: "20px" }}>
      <h2>Scores List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {scores.map((item, index) => (
          <li
            key={item.username}
            style={{
              margin: "10px 0",
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "5px",
            }}
            className="w-full"
          >
            <strong>Username:</strong> {item.username}
            <br />
            <strong>Score:</strong> {item.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoresList;
