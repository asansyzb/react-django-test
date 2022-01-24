import React, { useState, useContext } from "react";
import styles from "./CreatePlaylist.module.css";
import { createPlaylist } from "../../../store/services";
import { Context } from "../../../store/context";

const CreatePlaylist = () => {
  const [createPressed, setCreatePressed] = useState();
  const [playlistTitle, setPlaylistTitle] = useState("");

  const { playlists, setPlaylists } = useContext(Context);

  const handleCreate = () => {
    setCreatePressed(!createPressed);
  };

  const handleInputChange = (e) => {
    setPlaylistTitle(e.target.value);
  };

  const handleOnSubmit = (e) => {
    createPlaylist(playlistTitle)
      .then((result) => {
        setPlaylists([...playlists, result]);
      })
      .catch((e) => console.log);

    setCreatePressed(false);
    setPlaylistTitle("");
    e.preventDefault();
  };

  return (
    <div className={styles.playlistRow}>
      <button className={styles.addPlaylist} onClick={handleCreate}>
        <svg
          enableBackground="new 0 0 50 50"
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
            strokeMiterlimit="10"
            strokeWidth="2"
            x1="8"
            x2="40"
            y1="24"
            y2="24"
          />
          <line
            fill="none"
            stroke="#fff"
            strokeMiterlimit="10"
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
