import React, { useContext } from "react";
import CreatePlaylist from "./CreatePlaylist/CreatePlaylist";
import PlaylistRow from "./PlaylistRow/PlaylistRow";
import { Context } from "../../store/context";
import { useNavigate } from "react-router-dom";

const Playlists = () => {
  const { playlists } = useContext(Context);
  const navigate = useNavigate();

  const handleOnClick = (playlist) => {
    navigate(playlist.id);
  };

  return (
    <>
      <CreatePlaylist />
      {playlists.map((playlist) => (
        <PlaylistRow
          playlist={playlist}
          key={playlist.id}
          deleteButton
          onClick={handleOnClick}
        />
      ))}
    </>
  );
};

export default Playlists;
