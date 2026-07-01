import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Callback from "./components/Callback";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import PlaylistComponent from "./Services/FetchPlaylist";
import YtPage from "./components/YtPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/playlists" element={<PlaylistComponent />} />

          <Route path="/ytplay" element={<YtPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
