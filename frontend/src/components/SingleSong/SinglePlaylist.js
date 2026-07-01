import React, { useState } from "react";
import { HiPlay } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import "./single.css"; // Importing the new CSS file

const SinglePlaylist = ({ playlist }) => {
  const [showPlayer, setShowPlayer] = useState(false);

  const truncate = (title, maxChars = 40) => {
    if (title?.length > maxChars) {
      return title.slice(0, maxChars) + "...";
    }
    return title;
  };

  return (
    <div className="single-playlist-container">
      <div className="playlist-info">
        <img
          src={playlist?.picture_big}
          alt={playlist?.title}
          onClick={() => setShowPlayer(!showPlayer)} // Toggle player on image click
        />
        <div className="playlist-details">
          <a href={playlist?.link} target="_blank" rel="noopener noreferrer">
            <h2>{truncate(playlist?.title)}</h2>
          </a>
          <div className="player-controls">
            {showPlayer ? (
              <AiFillCloseCircle
                size={30}
                onClick={() => setShowPlayer(!showPlayer)}
              />
            ) : (
              <HiPlay size={30} onClick={() => setShowPlayer(!showPlayer)} />
            )}
          </div>
        </div>
      </div>

      {showPlayer && (
        <div className="iframe-container">
          <iframe
            title="Deezer Player"
            src={`https://widget.deezer.com/widget/auto/playlist/${playlist.id}`}
            width="100%"
            height="200"
            frameBorder="0"
            allowTransparency="true"
            allow="encrypted-media"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default SinglePlaylist;
