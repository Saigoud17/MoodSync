const express = require("express");
const cors = require("cors");
const axios = require("axios");
const sentiment = require("sentiment");
const app = express();
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

dotenv.config();

app.get("/api/YtApi/playlists", async (req, res) => {
  const { mood } = req.query;
  console.log("Current mood:", process.env.YOUTUBE_API_KEY);

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&q=${encodeURIComponent(
    mood + " music playlist"
  )}&key=${process.env.YOUTUBE_API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data.items); // Send only items to frontend
  } catch (error) {
    console.error("Error fetching YouTube data:", error.message);
    res.status(500).json({ error: "Failed to fetch YouTube playlists" });
  }
});

app.get("/", async (req, res) => {
  res.json({ message: "the backend routs are running succesfully" });
});
app.get("/api/DeeZer/playlists", async (req, res) => {
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
  console.log(`Server running at port ${PORT}`);
});
