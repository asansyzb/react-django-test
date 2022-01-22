import React from "react";
import secondsToTime from "../helpers/time";
import styles from "./Timeline.module.css";

const Timeline = ({ audioRef }) => {
  return (
    <div className={styles.timeContainer}>
      {audioRef &&
        audioRef.current &&
        audioRef.current.currentTime >= 0 &&
        audioRef.current.duration >= 0 && (
          <>
            {secondsToTime(audioRef.current.currentTime)}
            <br />
            {secondsToTime(audioRef.current.duration)}
          </>
        )}
    </div>
  );
};

export default Timeline;
