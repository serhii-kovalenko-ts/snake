import type { GameActionHandler } from "../types/input-types";

export interface Input {
  setActionHandler(handler: GameActionHandler): void;
  destroy(): void;
}
