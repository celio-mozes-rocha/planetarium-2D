// pour réprésenter la lune et les phases

export function drawHalfCircle(
  ctx: CanvasRenderingContext2D,
  r: number,
  reverse: boolean,
  color: string,
) {
  ctx.beginPath();
  ctx.arc(0, 0, r, Math.PI / 2, -Math.PI / 2, reverse);
  ctx.fillStyle = color;
  ctx.fill();
}

export function drawHalfEllipse(
  ctx: CanvasRenderingContext2D,
  e: number,
  r: number,
  start: number,
  end: number,
  color: string,
) {
  ctx.beginPath();
  ctx.ellipse(0, 0, e, r, 0, start, end, false);
  ctx.fillStyle = color;
  ctx.fill();
}
