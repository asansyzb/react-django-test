import React from "react";
import styles from "./PlaylistRow.module.css";

const PlaylistRow = ({ playlist }) => {
  const handleCreate = () => {};

  return (
    <div className={styles.playlistRow}>
      {playlist.cover_art ? (
        <img
          className={styles.trackCoverArt}
          src={playlist.cover_art}
          alt={playlist.title}
        />
      ) : (
        <span
          className={styles.playlistCoverArt}
          style={{ background: "#fff" }}
        >
          &nbsp;
        </span>
      )}
      <div className={styles.playlistTitle}>{playlist.title}</div>
    </div>
  );
};

export default PlaylistRow;
