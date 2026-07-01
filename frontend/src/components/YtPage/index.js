import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fetchPlaylists from "../../Services/DeezerService"; // Same file used for both APIs
import "./yt.css";

const YouTubePlaylistComponent = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const mood = location.state?.mood || "happy";

  // console.log("from youtube", mood);

  useEffect(() => {
    const fetchYTPlaylists = async () => {
      try {
        const result = await fetchPlaylists(mood, "youtube"); // It detects and returns YouTube if angry/fear/disgust

        // console.log("ytcomponent", result.data);

        setVideos(result.data);
      } catch (err) {
        setError(err.message || "Failed to fetch YouTube playlists");
      }
    };

    fetchYTPlaylists();
  }, [mood]);

  const handleBack = () => {
    navigate("/playlists", { state: { mood } }); // Go back to Deezer tab
  };

  return (
    <div className="ytcontainer">
      <div className="ty-top">
        <h2>
          🎵 Mood-based Vibes: <span className="mood-highlight">{mood}</span>
        </h2>
        <button className="back-button" onClick={handleBack}>
          ⬅ Back to Deezer
        </button>
      </div>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div className="singlePlaylist">
        <ul>
          {videos.length === 0 ? (
            <p>No YouTube videos found.</p>
          ) : (
            <div className="videos">
              {videos.map((video) => (
                <li key={video.id.videoId} className="ytVideoBox">
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${video.id.videoId}`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title={video.snippet.title}
                  ></iframe>
                  <p className="ytTitle">{video.snippet.title}</p>
                </li>
              ))}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default YouTubePlaylistComponent;
