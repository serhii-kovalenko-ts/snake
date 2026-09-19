import type { GameState } from "../../config/game-states";
import type { Point } from "../types/point-types";

export interface IRenderView {
  state: GameState;
  snake: Point[];
  food: Point;
  score: number;
}

export interface Renderer {
  render(view: IRenderView): void;
}
