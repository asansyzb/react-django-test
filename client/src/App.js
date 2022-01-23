import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";

import Tracks from "./components/Tracks";
import Playlists from "./components/Playlists";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import Context from "./store/context";
import { fetchPlaylist, fetchTracks } from "./store/services";

const ROUTES = {
  TRACKS: "#tracks",
  PLAYLISTS: "#playlists",
};

function App() {
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();
  const [currentPage, setCurrentPage] = useState(
    window.location.href.includes(ROUTES.TRACKS)
      ? ROUTES.TRACKS
      : ROUTES.PLAYLISTS
  );
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetchTracks().then((data) => setTracks(data));
  }, []);

  useEffect(() => {
    fetchPlaylist().then((data) => setPlaylists(data));
  }, []);

  useEffect(() => {
    const handleHashChange = (e) => {
      console.log(e.newURL.includes(ROUTES.PLAYLISTS));
      if (e.newURL.includes(ROUTES.TRACKS)) {
        setCurrentPage(ROUTES.TRACKS);
      } else if (e.newURL.includes(ROUTES.PLAYLISTS)) {
        setCurrentPage(ROUTES.PLAYLISTS);
      } else {
        setCurrentPage(ROUTES.TRACKS);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handlePlay = (track) => setCurrentTrack(track);

  return (
    <Context.Provider value={{ isPlaying, setIsPlaying }}>
      <>
        <main className={styles.app}>
          <nav>
            <img src={logo} className={styles.logo} alt="Logo" />
            <ul className={styles.menu}>
              <li>
                <a
                  href={ROUTES.TRACKS}
                  className={currentPage === ROUTES.TRACKS ? styles.active : ""}
                >
                  Tracks
                </a>
              </li>
              <li>
                <a
                  href={ROUTES.PLAYLISTS}
                  className={
                    currentPage === ROUTES.PLAYLISTS ? styles.active : ""
                  }
                >
                  Playlists
                </a>
              </li>
            </ul>
          </nav>
          {currentPage === ROUTES.TRACKS && (
            <Tracks
              tracks={tracks}
              handlePlay={handlePlay}
              currentTrack={currentTrack}
            />
          )}
          {currentPage === ROUTES.PLAYLISTS && (
            <Playlists playlists={playlists} />
          )}
        </main>
        {currentTrack && <AudioPlayer track={currentTrack} />}
      </>
    </Context.Provider>
  );
}

export default App;
