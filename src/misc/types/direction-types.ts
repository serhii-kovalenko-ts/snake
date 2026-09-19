import { GameAction } from "./input-types";

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

export const OPPOSITE: Record<Direction, Direction> = {
  [Direction.Up]: Direction.Down,
  [Direction.Down]: Direction.Up,
  [Direction.Left]: Direction.Right,
  [Direction.Right]: Direction.Left,
};

export const ACTION_TO_DIRECTION: Partial<Record<GameAction, Direction>> = {
  up: Direction.Up,
  down: Direction.Down,
  left: Direction.Left,
  right: Direction.Right,
};

export function isOppositeDirection(current: Direction, next: Direction): boolean {
  return OPPOSITE[current] === next;
}
