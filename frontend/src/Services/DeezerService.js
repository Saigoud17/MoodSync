import axios from "axios";
import axiosInstance from "../features/axiosInstance";

const emotionToCategory = {
  happy: ["happy", "party", "dance"],
  sad: ["sad", "soft"],
  energetic: ["workout", "rock"],
  calm: ["chill", "relax"],
  angry: ["metal", "hard rock"],
  neutral: ["pop", "indie", "easy listening"],
  surprised: ["electronic", "EDM", "techno"],
  fear: ["dark", "cinematic", "ambient"],
  excited: ["energy"],
  disgust: ["grunge", "punk", "alternative"],
};

const fetchPlaylists = async (emotion, source) => {
  // Use the emotion to map to Deezer's categories
  var angry = false;
  // console.log("checking for emotion recived", emotion);

  if (emotion === "angry") {
    angry = true;
  }
  const category = angry
    ? emotionToCategory["calm"]
    : emotionToCategory[emotion] || [];
  // console.log("checking for emotions array", category);
  const mood = category.join(","); // Join the category tags for Deezer's query

  // console.log("moods joined", mood);
  const url =
    source === "youtube"
      ? `YtApi/playlists?mood=${mood}`
      : `DeeZer/playlists?mood=${mood}`;
  //const url = `http://localhost:5000/api/DeeZer/playlists?mood=${mood}`;
  try {
    // console.log(url);
    const response = await axiosInstance.get(url);
    // console.log(response);
    // if (!response.ok) throw new Error("Failed to fetch playlists");

    const data = response.data;
    // console.log("Fetched data from backend:", data);
    const results = {
      data: data,
      angry: angry ? true : false,
      source: "youtube",
    };
    return results || []; // Safely handle missing data
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return [];
  }
};

export default fetchPlaylists;
