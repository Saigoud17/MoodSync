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

const fetchPlaylists = async (emotion) => {
  // Use the emotion to map to Deezer's categories
  console.log("checking for emotion recived", emotion);
  const category = emotionToCategory[emotion] || [];
  console.log("checking for emotions array", category);
  const mood = category.join(","); // Join the category tags for Deezer's query

  console.log("moods joined", mood);
  const url = `http://localhost:5000/api/playlists?mood=${mood}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch playlists");

    const data = await response.json();
    console.log("Fetched data from backend:", data);
    return data.data || []; // Safely handle missing data
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return [];
  }
};

export default fetchPlaylists;
