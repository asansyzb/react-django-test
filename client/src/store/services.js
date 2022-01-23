const API_BASE_URL = "http://localhost:8000";

export const fetchTracks = async () => {
  return fetch(`${API_BASE_URL}/api/tracks`)
    .then((res) => res.json())
    .catch((e) => console.log(e));
};

export const fetchPlaylist = async () => {
  return fetch(`${API_BASE_URL}/api/playlists`)
    .then((res) => res.json())
    .catch((e) => console.log(e));
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
    .catch((e) => console.log(e));
};
