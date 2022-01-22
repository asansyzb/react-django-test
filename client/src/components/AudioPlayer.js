import React, { useRef, useState, useEffect } from "react";
import styles from "./AudioPlayer.module.css";
import Waveform from "./Waveform";
import secondsToTime from "../helpers/time";

function AudioPlayer({ track }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [waveformData, setWaveformData] = useState();
  const [waveformDataFetching, setWaveformDataFetching] = useState(true);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    const getWaveformData = async (url) => {
      setWaveformDataFetching(true);
      const proxy = "http://localhost:8000/api/tracks/get_waveform?url="
      await fetch(proxy + url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setWaveformData(data);
          setWaveformDataFetching(false);
        })
        .catch((e) => console.log(e));
    };

    if (track) {
      getWaveformData(track.waveform);
    }
  }, [track]);

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = (e) => {
    setProgress((e.target.currentTime / e.target.duration) * 100);
  };

  const handleTogglePlaybackClick = () => {
    return audioRef.current.paused
      ? audioRef.current.play()
      : audioRef.current.pause();
  };

  const handleSliderChange = (calculatedTime) => {
    audioRef.current.currentTime = calculatedTime;
    audioRef.current.paused && audioRef.current.play();
  };

  useEffect(() => {
    const handleSpaceKey = (e) => {
      if (e.code === "Space") {
        handleTogglePlaybackClick();
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleSpaceKey);
    return () => window.removeEventListener("keydown", handleSpaceKey);
  }, []);

  useEffect(() => {
    audioRef.current.addEventListener("play", handlePlay);
    audioRef.current.addEventListener("pause", handlePause);
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
  }, []);

  useEffect(() => {
    audioRef.current.play();
    audioRef.current.currentTime = 0;
  }, [track]);

  console.log(audioRef);

  return (
    <>
      <audio src={track.audio} ref={audioRef} />
      <div className={styles.audioPlayer}>
        <button
          className={styles.togglePlaybackButton}
          onClick={handleTogglePlaybackClick}
        >
          {isPlaying ? (
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
              <path d="M20 12L8 5V19L20 12Z" fill="#000" />
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
        <div className={styles.sliderContainer}>
          {!waveformDataFetching && waveformData && (
            <Waveform
              progress={progress}
              waveformData={waveformData}
              trackDuration={track.length * 1000}
              handleSliderChange={handleSliderChange}
              trackPlaying={isPlaying}
            />
          )}
        </div>
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
      </div>
    </>
  );
}

export default AudioPlayer;
