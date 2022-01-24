import React, { useContext } from "react";
import styles from "./TrackRow.module.css";
import secondsToTime from "../../helpers/time";
import { Context } from "../../store/context";
import TrashIcon from "../../assets/trash.svg";

function TrackRow({
  addButton,
  deleteButton,
  handleOnDelete,
  track,
  isCurrentTrackPlaying,
  handleAdd,
}) {
  const { isPlaying, setIsPlaying, handlePlay } = useContext(Context);

  const handleDelete = () => {
    handleOnDelete && handleOnDelete(track);
  };

  const handlePlayButton = () => {
    handlePlay(track);
    setIsPlaying(!isPlaying);
  };

  const handleAddButton = () => {
    handleAdd && handleAdd(track);
  };

  return (
    <>
      <div className={styles.trackRow}>
        <div className={styles.trackInfoContainer}>
          <button className={styles.trackPlay} onClick={handlePlayButton}>
            {isPlaying && isCurrentTrackPlaying ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 5H7V19H10V5ZM17 5H14V19H17V5Z"
                  fill="#000"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 12L8 5V19L20 12Z" fill="white" />
              </svg>
            )}
          </button>
          {addButton && (
            <button className={styles.trackPlay} onClick={handleAddButton}>
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
          )}
          <img
            className={styles.trackCoverArt}
            src={track.cover_art}
            alt={track.title}
          />
          <div className={styles.trackInfo}>
            <div className={styles.trackTitle}>{track.title}</div>
            <div className={styles.trackArtist}>
              {track.main_artists.join(", ")}
            </div>
          </div>
        </div>
        <div className={styles.trackRightContainer}>
          {secondsToTime(track.length)}
          <div>
            {deleteButton && (
              <button className={styles.trashIconButton} onClick={handleDelete}>
                <img
                  src={TrashIcon}
                  alt="Delete"
                  className={styles.trashIcon}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackRow;
