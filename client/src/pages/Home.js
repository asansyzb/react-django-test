import React, { useEffect, useContext } from "react";
import styles from "./Home.module.css";
import logo from "../assets/logo.svg";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";
import { Context } from "../store/context";
import { fetchPlaylist, fetchTracks } from "../store/services";
import ROUTES from "../router/constants";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

const Home = ({ children }) => {
  const {
    setTracks,
    setPlaylists,
    currentTrack,
    setPlaylistsFetched,
    setTracksFetched,
    playlists,
    tracks,
    tracksFetched,
    playlistsFetched,
  } = useContext(Context);
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    if (tracks.length || tracksFetched) {
      return;
    }
    fetchTracks().then((data) => {
      setTracks(data);
      setTracksFetched(true);
    });
  }, [setTracks, setTracksFetched, tracks.length, tracksFetched]);

  useEffect(() => {
    if (playlists.length && playlistsFetched) {
      return;
    }
    fetchPlaylist().then((data) => {
      setPlaylists(data);
      setPlaylistsFetched(true);
    });
  }, [setPlaylists, setPlaylistsFetched, playlists.length, playlistsFetched]);

  const currentPlaylist = playlists.find((x) => x.id === params.id);

  return (
    <>
      <main className={styles.app}>
        <nav>
          <img src={logo} className={styles.logo} alt="Logo" />
          <ul className={styles.menu}>
            <li>
              <Link
                to={ROUTES.TRACKS}
                className={
                  location.pathname === ROUTES.TRACKS ? styles.active : ""
                }
              >
                Tracks
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.PLAYLISTS}
                className={
                  location.pathname === ROUTES.PLAYLISTS ? styles.active : ""
                }
              >
                Playlists
              </Link>
            </li>
            {currentPlaylist && (
              <li>
                <a className={styles.active}>{currentPlaylist.title}</a>
              </li>
            )}
          </ul>
        </nav>
        <Outlet />
      </main>
      {currentTrack && <AudioPlayer track={currentTrack} />}
    </>
  );
};

export default Home;
