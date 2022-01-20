const secondsToTime = (e) => {
  const m = Math.floor((e % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(e % 60)
    .toString()
    .padStart(2, "0");
  return m + ":" + s;
};

export default secondsToTime;
