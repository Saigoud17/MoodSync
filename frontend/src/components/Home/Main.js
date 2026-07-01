import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./css/Main.css";
import { LuScanText } from "react-icons/lu";
import axios from "axios";
import WebcamEmotionDetector from "../WebcamEmotionDetector";
import { IoReload } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { TbMusicSearch } from "react-icons/tb";
import ram from "../../IMG/rama.png";
import scanimage from "../../IMG/messages.png";
import axiosInstance from "../../features/axiosInstance";
const Main = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [detected, setdetcted] = useState(false);
  const [mood, setMood] = useState("");
  const [webcam, setwebcam] = useState(false);

  // Adding manual mood options

  const moodOptions = ["happy", "sad", "angry", "neutral", "fear", "energetic"];

  useEffect(() => {
    if (!user) {
      navigate("/Auth");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (detected && mood) {
      console.log(mood, typeof mood);

      navigate("/playlists", { state: { mood } });
    }
  }, [detected, mood, navigate]);

  const handleSubmit = async () => {
    if (!text.trim() && !mood) {
      setError("Please enter some text or select a mood.");
      return;
    }
    setError("");

    try {
      let detectedMood = mood;

      // If text is provided, analyze sentiment to determine mood
      if (text.trim()) {
        const sentimentResponse = await axiosInstance.post("/sentiment", {
          text,
        });
        detectedMood = sentimentResponse.data.mood;
        setMood(detectedMood);
      }

      console.log("Detected Mood:", detectedMood);
      setdetcted(true);
    } catch (err) {
      setError("Failed to analyze sentiment or fetch playlists.");
    }
  };

  const handleselectMood = () => {
    //alert(mood);
    if (!mood) {
      setError("Please select a mood");
    }
    setMood(mood);
  };

  return (
    <div className="home">
      <div className="auth sec">
        {user ? (
          <>
            <h1 className="h1tag">
              <span id="spano">JAI SREE RAM </span>
              <img style={{ width: "39px", height: "39px" }} src={ram}></img>
              <span id="span1">{" " + user.display_name}</span>

              <br />
              <span id="span2">
                Let’s match your mood with the perfect tune!{" "}
                <span id="span3">Select a mood detection method:</span>
              </span>
            </h1>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="textarea"
              >
                {detected ? (
                  <IoReload size={35} onClick={handleSubmit} />
                ) : (
                  <img src={scanimage} onClick={handleSubmit} />
                )}
                <textarea
                  style={{}}
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  placeholder="Describe your mood buddy !!"
                />
              </div>

              {/* Manual mood selection dropdown */}
              <div className="options">
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    margin: "10px 0",
                  }}
                  onSubmit={handleselectMood}
                >
                  <option value="">Select your mood</option>
                  {moodOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div onClick={handleSubmit} className="go">
                  <TbMusicSearch className="icon" size={24} /> <h3>GO</h3>
                </div>
              </div>
              {error && <p>{error}</p>}
              <WebcamEmotionDetector />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Main;
