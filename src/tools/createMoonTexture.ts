export function createMoonTexture(
  ctx: CanvasRenderingContext2D,
): CanvasPattern | null {
  const size = 256;
  const off = document.createElement("canvas");
  off.width = size;
  off.height = size;

  const octx = off.getContext("2d")!;
  octx.fillStyle = "#dcdce6";
  octx.fillRect(0, 0, size, size);

  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 1.5;

    octx.beginPath();
    octx.arc(x, y, r, 0, Math.PI * 2);

    const gray = 180 + Math.random() * 40;
    octx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
    octx.fill();
  }

  return ctx.createPattern(off, "repeat");
}
