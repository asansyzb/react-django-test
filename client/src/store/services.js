const API_BASE_URL = "http://localhost:8000";

export const fetchTracks = async () => {
  return fetch(`${API_BASE_URL}/api/tracks`)
    .then((res) => res.json())
    .catch((e) => console.log);
};

export const fetchPlaylist = async () => {
  return fetch(`${API_BASE_URL}/api/playlists`)
    .then((res) => res.json())
    .catch((e) => console.log);
};

export const fetchWaveform = async (url) => {
  const proxy = `${API_BASE_URL}/api/tracks/waveform?url=${url}`;
  return fetch(proxy, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((e) => console.log);
};

export const createPlaylist = async (title) => {
  return fetch("http://localhost:8000/api/playlists/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      tracks: [],
    }),
  })
    .then((response) => response.json())
    .catch((e) => console.log);
};

export const deletePlaylist = async (id) => {
  return fetch(`${API_BASE_URL}/api/playlists/${id}`, {
    method: "delete",
  })
    .then((response) => response.json())
    .catch((e) => console.log);
};

export const updatePlaylistTracks = async ({ id, tracksIds }) => {
  return fetch(`${API_BASE_URL}/api/playlists/${id}/`, {
    method: "patch",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tracks: tracksIds,
    }),
  })
    .then((response) => response.json())
    .catch((e) => console.log);
};
