export const COLORS = {
  background: "#111126",
  grid: "rgba(0, 229, 255, 0.06)",
  overlay: "rgba(7, 7, 20, 0.82)",
  title: "#00E5FF",
  muted: "#8A7FA8",
  score: "#FF20D6",
} as const;

export const SCORE_STYLE = {
  x: 20,
  y: 16,
  font: "24px Segoe UI, system-ui, sans-serif",
} as const;

export const PANEL_STYLE = {
  titleOffsetY: 80,
  textOffsetY: 8,
  lineHeight: 40,
  titleFont: "700 64px Segoe UI, system-ui, sans-serif",
  textFont: "28px Segoe UI, system-ui, sans-serif",
} as const;
