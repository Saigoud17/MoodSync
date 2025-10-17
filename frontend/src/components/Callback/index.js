import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../features/AuthSlice";
import { data, useNavigate } from "react-router-dom";

const Callback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.substring(1)).get("access_token");

    if (token) {
      dispatch(setToken(token)); // Store token in Redux
      fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(token);
          console.log(data);
          dispatch(setUser(data)); // Store user details
          navigate("/");
        })
        .catch((error) => console.error("Error fetching user info:", error));
    }
  }, [dispatch, navigate]);

  return <h2>Logging in...</h2>;
};

export default Callback;
