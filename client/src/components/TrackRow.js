import React from "react";
import styles from "./TrackRow.module.css";
import secondsToTime from "../helpers/time";

function TrackRow({ track, handlePlay }) {
  return (
    <div className={styles.trackRowPlaying}>
      <div className={styles.trackInfoContainer}>
        <button className={styles.trackPlay} onClick={() => handlePlay(track)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 12L8 5V19L20 12Z" fill="white" />
          </svg>
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
