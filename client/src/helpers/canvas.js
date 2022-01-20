const pointCoordinates = ({
  index,
  pointWidth,
  pointMargin,
  canvasHeight,
  amplitude,
}) => {
  const pointHeight = Math.round((amplitude / 100) * canvasHeight);
  const verticalCenter = Math.round((canvasHeight - pointHeight) / 2);
  return [
    index * (pointWidth + pointMargin), // x starting point
    canvasHeight - pointHeight - verticalCenter, // y starting point
    pointWidth, // width
    pointHeight, // height
  ];
};

const paintCanvas = ({
  canvasRef,
  waveformData,
  canvasHeight,
  pointWidth,
  pointMargin,
  playingPoint,
  hoverXCoord,
}) => {
  const ref = canvasRef.current;
  const ctx = ref.getContext("2d");
  // On every canvas update, erase the canvas before painting
  // If you don't do this, you'll end up stacking waveforms and waveform
  // colors on top of each other
  ctx.clearRect(0, 0, ref.width, ref.height);
  waveformData.forEach((p, i) => {
    ctx.beginPath();
    const coordinates = pointCoordinates({
      index: i,
      pointWidth,
      pointMargin,
      canvasHeight,
      amplitude: p,
    });
    ctx.rect(...coordinates);
    const withinHover = hoverXCoord >= coordinates[0];
    const alreadyPlayed = i < playingPoint;
    if (withinHover) {
      ctx.fillStyle = alreadyPlayed ? "#1e4c6a" : "#1881b7";
    } else if (alreadyPlayed) {
      ctx.fillStyle = "#009de0";
    } else {
      ctx.fillStyle = "#a4cdf0";
    }
    ctx.fill();
  });
};

export { paintCanvas, pointCoordinates };
