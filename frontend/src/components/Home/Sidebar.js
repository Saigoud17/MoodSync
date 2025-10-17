import React from "react";
import "./css/sidebar.css";
const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>MOODsync</h2>
      <ul>
        <li>
          <a href="/">Dashboard</a>
        </li>
        <li>
          <a href="/playlists">Playlists</a>
        </li>
        <li>
          <a href="/settings">Settings</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
