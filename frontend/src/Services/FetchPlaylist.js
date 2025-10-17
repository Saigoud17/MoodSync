import React, { useEffect, useState } from "react";
import fetchPlaylists from "./DeezerService";
import SinglePlaylist from "../components/SingleSong/SinglePlaylist";
import { useLocation } from "react-router-dom";
import image from "../IMG/Music-rafiki (1).svg";
import "./service.css";
const PlaylistComponent = ({ emotion }) => {
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);

  const location = useLocation();
  const mood = emotion || location.state?.mood;
  console.log("Emotion received in PlaylistComponent:", mood);

  useEffect(() => {
    if (!mood) return; // Ensure an mood is provided

    const getPlaylists = async () => {
      try {
        const data = await fetchPlaylists(mood);
        console.log("Fetched playlists:", data);
        setPlaylists(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getPlaylists();
  }, [mood]); // Runs when mood changes

  return (
    <div className="container">
      {" "}
      <span>
        {mood ? (
          <h2>Your detected mood: {mood}. Ready for some beats?</h2>
        ) : (
          <h2>Select a mood detection method:</h2>
        )}
      </span>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <div className="singlePlaylist">
        <ul>
          {playlists.length === 0 ? (
            <p>No playlists found.</p>
          ) : (
            playlists.map((playlist) => (
              <SinglePlaylist key={playlist.id} playlist={playlist} />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default PlaylistComponent;
