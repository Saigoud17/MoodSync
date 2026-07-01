import React, { useEffect, useState } from "react";
import fetchPlaylists from "./DeezerService";
import SinglePlaylist from "../components/SingleSong/SinglePlaylist";
import { useLocation, useNavigate } from "react-router-dom";
import image from "../IMG/Music-rafiki (1).svg";
import "./service.css";
const PlaylistComponent = ({ emotion }) => {
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);
  const [isYt, setYt] = useState(false);
  const location = useLocation();
  const mood = emotion || location.state?.mood;
  const [isanger, setanger] = useState(false);
  const navigate = useNavigate();
  // console.log("Emotion received in PlaylistComponent:", mood);

  const qoutes = [
    "😉Rough day? Let the rhythm melt your anger away",
    "Anger doesn’t suit you🤨. How about a calming track instead?",
    "Come on, smile a bit😉. Here's something soothing for your soul.",
    "Feeling angry? You deserve peace.💌Let’s fix that with a song.",
    "Why so angry😜, friend? Let this music cool you down.",
  ];

  useEffect(() => {
    if (!mood) return; // Ensure an mood is provided

    const getPlaylists = async () => {
      try {
        const data = await fetchPlaylists(mood, "deezer");
        // console.log("Fetched playlists:", data.data.data);
        if (data.angry === true) {
          setanger(true);
        }
        setPlaylists(data.data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    getPlaylists();
  }, [mood]); // Runs when mood changes

  const handleYt = () => {
    navigate("/ytplay", { state: { mood } });
  };
  return (
    <div className="container">
      <span>
        {mood ? (
          <div className="dz-top">
            <div>
              <h2 className="moodhead1">
                Your detected mood: {mood}. Ready for some beats?
              </h2>

              {isanger && (
                <h2 className="angryqoute">
                  {qoutes[Math.floor(Math.random() * qoutes.length)]}
                </h2>
              )}
            </div>
            <button onClick={handleYt}>Get YouTube Playlists</button>
          </div>
        ) : (
          <h2>Select a mood detection method:</h2>
        )}
      </span>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <div className="singlePlaylist">
        <ul>
          {playlists?.length === 0 ? (
            <p>No playlists found.</p>
          ) : (
            playlists?.map((playlist) => (
              <SinglePlaylist key={playlist.id} playlist={playlist} />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default PlaylistComponent;
