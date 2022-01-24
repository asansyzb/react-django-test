import React, { useContext } from "react";
import TrackRow from "../../Tracks/TrackRow";
import { useParams } from "react-router-dom";
import { Context } from "../../../store/context";
import Loader from "../../Loader";
import { updatePlaylistTracks } from "../../../store/services";

const Playlist = () => {
  const { playlists, tracks, tracksFetched, playlistsFetched, setPlaylists } =
    useContext(Context);

  const params = useParams();

  if (!tracksFetched || !playlistsFetched) {
    return <Loader />;
  }

  const currentPlaylist = playlists.find((x) => x.id === params.id);

  const handleOnDelete = (track) => {
    window.confirm(
      `Are you sure you want to delete from Playlist - ${currentPlaylist.title} the song - ${track.title}`
    ) &&
      updatePlaylistTracks({
        id: currentPlaylist.id,
        tracksIds: currentPlaylist.tracks.filter((x) => x !== track.id),
      }).then((x) => {
        setPlaylists(
          playlists.map((playlist) => (playlist.id === x.id ? x : playlist))
        );
      });
    // setPlaylists(playlists.filter((x) => x.id !== playlist.id))
  };

  return currentPlaylist.tracks
    .map((x) => tracks.find((y) => y.id === x))
    .map((track, ix) => (
      <TrackRow
        key={ix}
        track={track}
        deleteButton
        handleOnDelete={handleOnDelete}
      />
    ));
};

export default Playlist;
