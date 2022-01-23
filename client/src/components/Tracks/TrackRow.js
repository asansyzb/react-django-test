import React, { useContext } from "react";
import styles from "./TrackRow.module.css";
import secondsToTime from "../../helpers/time";
import Context from "../../store/context";

function TrackRow({ track, handlePlay, isCurrentTrackPlaying }) {
  const { isPlaying, setIsPlaying } = useContext(Context);

  const handlePlayButton = () => {
    handlePlay(track);
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.trackRowPlaying}>
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
      <div className={styles.trackDuration}>{secondsToTime(track.length)}</div>
    </div>
  );
}

export default TrackRow;
