import React from "react";
import TrackRow from "./TrackRow";

const Tracks = ({ tracks, handlePlay, currentTrack }) => {
  return tracks.map((track, ix) => (
    <TrackRow
      key={ix}
      track={track}
      handlePlay={handlePlay}
      isCurrentTrackPlaying={currentTrack && track.id === currentTrack.id}
    />
  ));
};

export default Tracks;
