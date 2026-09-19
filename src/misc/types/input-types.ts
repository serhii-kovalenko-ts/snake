export type GameAction = "up" | "down" | "left" | "right" | "confirm" | "exit";

export type GameActionHandler = (action: GameAction) => void;

export const KEY_TO_ACTION: Record<string, GameAction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  Enter: "confirm",
  Backspace: "exit",
};
