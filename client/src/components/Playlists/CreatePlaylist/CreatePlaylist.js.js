import React, { useState } from "react";
import styles from "./CreatePlaylist.module.css";

const CreatePlaylist = () => {
  const [createPressed, setCreatePressed] = useState();
  const [playlistTitle, setPlaylistTitle] = useState("");

  const handleCreate = () => {
    setCreatePressed(!createPressed);
  };

  const handleInputChange = (e) => {
    setPlaylistTitle(e.target.value);
  };

  const handleOnSubmit = (e) => {
    fetch("http://localhost:8000/api/playlists/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: playlistTitle,
      }),
    })
      .then((response) => response.json())
      .then((result) => setPlaylistTitle(""))
      .catch((e) => console.log);
    setCreatePressed(false);
    e.preventDefault();
  };

  return (
    <div className={styles.playlistRow}>
      <button className={styles.addPlaylist} onClick={handleCreate}>
        <svg
          enable-background="new 0 0 50 50"
          height="50"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 50 50"
          width="50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect fill="none" height="50" width="50" />
          <line
            fill="none"
            stroke="#fff"
            stroke-miterlimit="10"
            strokeWidth="2"
            x1="8"
            x2="40"
            y1="24"
            y2="24"
          />
          <line
            fill="none"
            stroke="#fff"
            stroke-miterlimit="10"
            strokeWidth="2"
            x1="24"
            x2="24"
            y1="8"
            y2="40"
          />
        </svg>
      </button>
      <div className={styles.playlistTitle}>
        {createPressed ? (
          <form onSubmit={handleOnSubmit}>
            <input
              value={playlistTitle}
              onChange={handleInputChange}
              autoFocus
            />
          </form>
        ) : (
          "Create a new album"
        )}
      </div>
    </div>
  );
};

export default CreatePlaylist;
