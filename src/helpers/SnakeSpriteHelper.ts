import { ImageName, type SpriteName } from "../misc/types/assets-types";
import { Direction } from "../misc/types/direction-types";
import type { Point } from "../misc/types/point-types";

export function getSnakeSprite(snake: Point[], index: number): SpriteName {
  // Head sprite
  if (index === 0) {
    const direction = directionFromTo(snake[1], snake[0]);
    return getHeadSprite(direction);
  }

  // Tail sprite
  if (index === snake.length - 1) {
    const direction = directionFromTo(snake[index - 1], snake[index]);
    return getTailSprite(direction);
  }

  // Body connections
  const current = snake[index];
  const towardHead = directionFromTo(current, snake[index - 1]);
  const towardTail = directionFromTo(current, snake[index + 1]);

  if ((towardHead === Direction.Left && towardTail === Direction.Right) || (towardHead === Direction.Right && towardTail === Direction.Left)) {
    return ImageName.BODY_HORIZONTAL;
  }

  if ((towardHead === Direction.Up && towardTail === Direction.Down) || (towardHead === Direction.Down && towardTail === Direction.Up)) {
    return ImageName.BODY_VERTICAL;
  }

  if (hasDirections(towardHead, towardTail, Direction.Up, Direction.Left)) {
    return ImageName.BODY_TOP_LEFT;
  }

  if (hasDirections(towardHead, towardTail, Direction.Up, Direction.Right)) {
    return ImageName.BODY_TOP_RIGHT;
  }

  if (hasDirections(towardHead, towardTail, Direction.Down, Direction.Left)) {
    return ImageName.BODY_BOTTOM_LEFT;
  }

  return ImageName.BODY_BOTTOM_RIGHT;
}

function directionFromTo(from: Point, to: Point): Direction {
  if (to.x > from.x) {
    return Direction.Right;
  }

  if (to.x < from.x) {
    return Direction.Left;
  }

  if (to.y > from.y) {
    return Direction.Down;
  }

  return Direction.Up;
}

function hasDirections(first: Direction, second: Direction, expectedFirst: Direction, expectedSecond: Direction): boolean {
  return (first === expectedFirst && second === expectedSecond) || (first === expectedSecond && second === expectedFirst);
}

function getHeadSprite(direction: Direction): SpriteName {
  switch (direction) {
    case Direction.Up:
      return ImageName.HEAD_UP;

    case Direction.Down:
      return ImageName.HEAD_DOWN;

    case Direction.Left:
      return ImageName.HEAD_LEFT;

    case Direction.Right:
      return ImageName.HEAD_RIGHT;
  }
}

function getTailSprite(direction: Direction): SpriteName {
  switch (direction) {
    case Direction.Up:
      return ImageName.TAIL_UP;

    case Direction.Down:
      return ImageName.TAIL_DOWN;

    case Direction.Left:
      return ImageName.TAIL_LEFT;

    case Direction.Right:
      return ImageName.TAIL_RIGHT;
  }
}
