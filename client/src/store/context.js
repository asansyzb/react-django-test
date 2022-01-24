import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlistsFetched, setPlaylistsFetched] = useState(false);
  const [tracksFetched, setTracksFetched] = useState(false);

  const handlePlay = (track) => setCurrentTrack(track);

  return (
    <Context.Provider
      value={{
        isPlaying,
        setIsPlaying,
        playlists,
        tracks,
        setPlaylists,
        currentTrack,
        handlePlay,
        setTracks,
        playlistsFetched,
        setPlaylistsFetched,
        tracksFetched,
        setTracksFetched,
      }}
    >
      {children}
    </Context.Provider>
  );
};
