const express = require("express");
const cors = require("cors");
const axios = require("axios");
const sentiment = require("sentiment");
const app = express();
const PORT = 5000; // Choose any port

app.use(cors()); // Enable CORS
app.use(express.json()); // Allow JSON re \quests

// Proxy route for fetching playlists
app.get("/api/playlists", async (req, res) => {
  const { mood } = req.query;
  console.log("current moode:", mood);
  const url = `https://api.deezer.com/search/playlist?q=${mood}`;

  console.log(url);
  try {
    const response = await axios.get(url);

    console.log(response.data);
    res.json(response.data); // Send response to frontend
  } catch (error) {
    console.error("Error fetching playlists:", error.message);
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
});

app.post("/api/sentiment", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const sentimentAnalysis = new sentiment();
  const result = sentimentAnalysis.analyze(text);

  res.json({
    sentiment: result.score,
    mood: getMood(result.score),
  });
});

function getMood(score) {
  if (score > 3) return "excited";
  if (score > 1) return "happy";
  if (score < -3) return "angry";
  if (score < -1) return "sad";
  return "neutral";
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
