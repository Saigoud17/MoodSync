import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../features/AuthSlice";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "../Auth/Auth.css";
import google from "../../IMG/google-search.png";
import spotify from "../../IMG/spotify.png";
const CLIENT_ID = "3d155ece85034b37b54bcdefbf1801db";
const REDIRECT_URI = "http://localhost:3000/callback";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "playlist-modify-public",
];

const LoginWithSpotify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = () => {
    const authUrl = `${process.env.AUTH_ENDPOINT}?client_id=${
      process.env.CLIENT_ID
    }&response_type=token&redirect_uri=${encodeURIComponent(
      process.env.REDIRECT_URI
    )}&scope=${SCOPES.join("%20")}`;

    //console.log(authUrl);
    window.location.href = authUrl;
  };

  const LoginwithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const userData = {
        uid: result.user.uid,
        display_name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };

      console.log("User signed in:", result.user);

      dispatch(setToken(result.user.accessToken));
      dispatch(setUser(userData));
      navigate("/");
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <div className="Auth">
      <div className="para">
        <h1>Discover music based on your emotions.</h1>
        <p>Login Here to Enjoy Music !</p>
      </div>
      <div className="logins">
        <div className="googlelogin log" onClick={LoginwithGoogle}>
          <img src={google} />
          <p>Login with Google</p>
        </div>
        <div className="sportifylogin log" onClick={handleLogin}>
          <img src={spotify} />
          <p>Login with Spotify</p>
        </div>
      </div>
    </div>
  );
};

export default LoginWithSpotify;
