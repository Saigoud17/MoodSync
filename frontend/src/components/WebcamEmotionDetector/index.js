import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import LOGO from "../../IMG/face-recognition.png";
import PlaylistComponent from "../../Services/FetchPlaylist";
import { useSelector } from "react-redux";
import "./webcam.css";
import { useNavigate } from "react-router-dom";
/*
const fetchCategories = async (accessToken) => {
  const url = "https://api.spotify.com/v1/browse/categories";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: Bearer ${accessToken},
    },
  });

  if (!response.ok) {
    console.error(Error ${response.status}: ${response.statusText});
    return null;
  }

  const data = await response.json();
  console.log("Available Categories:", data.categories.items);
};
*/
const WebcamEmotionDetector = () => {
  const videoRef = useRef(null);
  const [emotion, setEmotion] = useState("");
  const navigate = useNavigate();
  const [isDetecting, setIsDetecting] = useState(false);
  const [popup, setpopup] = useState(false);

  useEffect(() => {
    loadModels();
  }, []);

  // Load face-api.js models
  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri(
      "/models/tiny_face_detector/"
    );
    await faceapi.nets.faceExpressionNet.loadFromUri(
      "/models/face_expression/"
    );
  };

  // Start the webcam
  const startWebcam = async () => {
    try {
      setpopup(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.addEventListener("play", detectEmotions);
      setIsDetecting(true);
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  // Detect emotions from the webcam feed
  const detectEmotions = async () => {
    const interval = setInterval(async () => {
      if (!videoRef.current) return;

      const detections = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceExpressions();

      if (detections) {
        const expressions = detections.expressions;
        const maxEmotion = Object.keys(expressions).reduce((a, b) =>
          expressions[a] > expressions[b] ? a : b
        );

        setEmotion(maxEmotion);

        // ✅ Stop Webcam After Detecting Emotion
        clearInterval(interval);
        stopWebcam();
        navigate("/playlists", { state: { mood: maxEmotion } });
      }
    }, 1000);
  };

  // Function to Stop Webcam
  const stopWebcam = () => {
    const stream = videoRef.current?.srcObject;
    const tracks = stream?.getTracks();
    tracks?.forEach((track) => track.stop());
    videoRef.current.srcObject = null;
    setIsDetecting(false);
    setpopup(false);
  };

  return (
    <div className="webcam-container">
      <div>
        <h2>
          📷 Open Webcam (Emotion Detection for Songs + Playlist Generation)
        </h2>
        <div className="webdiv">
          <div className="names">
            <p>
              <ul>
                <li>Click on the Icon beside 👉 🎧</li>

                <br />
                <li>Let Your Face Pick the Music! 📸</li>
                <br />
                <li>Face the Beat – Detect & Play! 😃🎵</li>
                <br />
                <li>🎭Scan Mood & Play Tunes 🎶</li>
                <br />
                <li>Feel the Vibes? Let’s Match Your Mood!</li>
              </ul>
            </p>
          </div>
          <div
            className="scan-logo"
            onClick={startWebcam}
            disabled={isDetecting}
          >
            <img src={LOGO} alt="Logo" />
          </div>
        </div>
      </div>

      <small>{isDetecting ? "Detecting..." : "Start Detection"}</small>

      {popup && (
        <div className="webcam-popup">
          <div className="popup-content">
            <span className="close-btn" onClick={stopWebcam}>
              &times;
            </span>
            <h3>Live Emotion Detection</h3>
            <video ref={videoRef} autoPlay muted className="webcam"></video>
            <h3>
              Detected Emotion:{" "}
              {emotion
                ? emotion.toUpperCase()
                : isDetecting
                ? "Detecting..."
                : "Click to Start"}
            </h3>
          </div>
        </div>
      )}

      {/* {console.log("from sended comp: ", token)} */}
      {/* {fetchCategories(token)} */}
      {console.log(emotion)}
    </div>
  );
};

export default WebcamEmotionDetector;
