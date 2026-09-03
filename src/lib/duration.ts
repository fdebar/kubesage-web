export function format(durationMs: number): string {
  if (durationMs < 1000) return `${durationMs} ms`;

  const durationSeconds = durationMs / 1000;
  if (durationSeconds < 10) return `${durationSeconds.toFixed(1)} s`;

  return `${Math.round(durationSeconds)} s`;
}
