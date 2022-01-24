import React, { useContext } from "react";
import styles from "./PlaylistRow.module.css";
import TrashIcon from "../../../assets/trash.svg";

import { deletePlaylist } from "../../../store/services";
import { Context } from "../../../store/context";

const PlaylistRow = ({ playlist, deleteButton, onClick }) => {
  const { playlists, setPlaylists } = useContext(Context);

  const handleDelete = (e) => {
    window.confirm(
      `Are you sure you want to delete Playlist - ${playlist.title}`
    ) &&
      deletePlaylist(playlist.id).then(() =>
        setPlaylists(playlists.filter((x) => x.id !== playlist.id))
      );
  };

  const handleClick = () => {
    onClick && onClick(playlist);
  };

  return (
    <div className={styles.playlistRowContainer} onClick={handleClick}>
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
      <div className={styles.playlistRow}>
        <div className={styles.playlistTitle}>{playlist.title}</div>
        {deleteButton && (
          <button className={styles.trashIconButton} onClick={handleDelete}>
            <img src={TrashIcon} alt="Delete" className={styles.trashIcon} />
          </button>
        )}
      </div>
    </div>
  );
};

export default PlaylistRow;
