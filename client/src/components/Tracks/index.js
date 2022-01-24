import React, { useContext, useState } from "react";
import TrackRow from "./TrackRow";
import { Context } from "../../store/context";
import Modal from "../Modal/Modal";
import PlaylistRow from "../Playlists/PlaylistRow/PlaylistRow";
import { updatePlaylistTracks } from "../../store/services";

const Tracks = () => {
  const { tracks, currentTrack, playlists, setPlaylists } = useContext(Context);
  const [selectedMusic, setSelectedMusic] = useState();

  const [showModal, setShowModal] = useState(false);

  const handleAddButton = (track) => {
    setSelectedMusic(track);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleClick = (playlist) => {
    updatePlaylistTracks({
      id: playlist.id,
      tracksIds: [...playlist.tracks, selectedMusic.id],
    }).then((x) => {
      setPlaylists(
        playlists.map((playlist) => (playlist.id === x.id ? x : playlist))
      );
      setShowModal(false);
    });
  };

  return (
    <>
      {tracks.map((track, ix) => (
        <TrackRow
          addButton
          key={ix}
          track={track}
          isCurrentTrackPlaying={currentTrack && track.id === currentTrack.id}
          handleAdd={handleAddButton}
        />
      ))}
      <Modal show={showModal} handleClose={handleCloseModal}>
        {playlists.map((playlist) => (
          <PlaylistRow
            key={playlist.id}
            playlist={playlist}
            onClick={handleClick}
          />
        ))}
      </Modal>
    </>
  );
};

export default Tracks;
