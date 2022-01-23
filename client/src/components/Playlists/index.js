import React from "react";
import CreatePlaylist from "./CreatePlaylist/CreatePlaylist.js";
import PlaylistRow from "./PlaylistRow/PlaylistRow";

const Playlists = ({ playlists }) => {
  return (
    <>
      <CreatePlaylist />
      {playlists.map((playlist) => (
        <PlaylistRow playlist={playlist} />
      ))}
    </>
  );
};

export default Playlists;
