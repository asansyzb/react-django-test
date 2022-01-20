import React, { useState, useEffect, useRef, useCallback } from "react";
import { paintCanvas } from "../helpers/canvas";
import waveformAvgChunker from "../helpers/waveform";
import styles from "./Waveform.module.css";

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

const Waveform = ({
  waveformData,
  trackPlaying,
  trackDuration,
  handleSliderChange,
  progress,
}) => {
  const canvasRef = useRef(null);
  const canvasHeight = 56;
  const [waveformWidth, setWaveformWidth] = useState(0);
  const pointWidth = 4;
  const pointMargin = 2;
  const [startTime, setStartTime] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [hoverXCoord, setHoverXCoord] = useState();

  const playingPoint =
    (trackProgress * waveformWidth) / 100 / (pointWidth + pointMargin);

  useEffect(() => {
    if (canvasRef.current) {
      setWaveformWidth(canvasRef.current.offsetWidth);
    }
  }, [canvasRef]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        setWaveformWidth(canvasRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    let animation;
    if (trackPlaying) {
      animation = window.requestAnimationFrame(() => {
        setTrackProgress(clamp(progress, 0, 100));
      });
    }
    return () => window.cancelAnimationFrame(animation);
  }, [trackPlaying, trackDuration, startTime, progress, setTrackProgress]);

  useEffect(() => {
    setStartTime();
  }, [trackPlaying]);

  const paintWaveform = useCallback(() => {
    const getWaveform = () => {
      if (waveformData) {
        const peaks = waveformData.data.filter((point) => point >= 0);
        const ratio = Math.max(...peaks) / 100;
        const normalized = peaks.map((point) => Math.round(point / ratio));
        return normalized;
      }
    };

    if (!waveformData) {
      return;
    }
    const chunkedData = waveformAvgChunker(
      getWaveform(waveformData.data),
      canvasRef.current.offsetWidth / (pointWidth + pointMargin)
    );

    paintCanvas({
      canvasRef,
      waveformData: chunkedData,
      canvasHeight,
      pointWidth,
      pointMargin,
      playingPoint,
      hoverXCoord,
    });
  }, [playingPoint, hoverXCoord, waveformData]);

  useEffect(() => {
    paintWaveform();
  }, [canvasRef, paintWaveform]);

  useEffect(() => {
    paintWaveform();
  }, [playingPoint, paintWaveform]);

  useEffect(() => {
    setTrackProgress(0);
    setStartTime(0);
  }, [waveformData]);

  const setDefaultX = useCallback(() => {
    setHoverXCoord();
  }, []);

  const handleMouseMove = useCallback((e) => {
    setHoverXCoord(e.clientX - canvasRef.current.getBoundingClientRect().left);
  }, []);

  const seekTrack = (e) => {
    const xCoord = e.clientX - canvasRef.current.getBoundingClientRect().left;
    const seekPerc = (xCoord * 100) / waveformWidth;
    const seekMs = (trackDuration * seekPerc) / 100;
    const calculatedTime = seekMs;
    setStartTime(Date.now() - calculatedTime);
    handleSliderChange(calculatedTime / 1000);
  };

  return (
    <div className={styles.canvasContainer}>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        style={{ height: canvasHeight, width: "100%" }}
        onBlur={setDefaultX}
        width={waveformWidth}
        height={canvasHeight}
        onMouseOut={setDefaultX}
        onMouseMove={handleMouseMove}
        onClick={seekTrack}
      />
    </div>
  );
};

export default Waveform;
