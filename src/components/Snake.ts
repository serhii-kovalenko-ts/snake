import { GRID_HEIGHT, GRID_WIDTH, INITIAL_SNAKE_LENGTH } from "../config/game-config";
import { pointsEqual } from "../helpers/PointHelper";
import { Direction, isOppositeDirection } from "../misc/types/direction-types";
import type { Point } from "../misc/types/point-types";

export class Snake {
  private segments: Point[] = [];
  private direction = Direction.Right;
  private queuedDirection = Direction.Right;

  constructor() {
    this.reset();
  }

  public get body(): Point[] {
    return this.segments;
  }

  private get head(): Point {
    return this.segments[0];
  }

  public reset(): void {
    this.segments.length = 0;
    this.direction = this.getRandomDirection();
    this.queuedDirection = this.direction;

    this.startAtCenter();
  }

  public queueDirection(next: Direction): void {
    if (isOppositeDirection(this.direction, next)) {
      return;
    }

    this.queuedDirection = next;
  }

  public willMoveTo(point: Point): boolean {
    return pointsEqual(this.getNextHeadPosition(), point);
  }

  public move(grow: boolean): void {
    this.direction = this.queuedDirection;
    const nextHead = this.getNextHeadPosition(this.direction);

    if (grow) {
      this.segments.unshift(nextHead);
      return;
    }

    const tail = this.segments.pop();
    if (!tail) {
      return;
    }

    tail.x = nextHead.x;
    tail.y = nextHead.y;

    this.segments.unshift(tail);
  }

  public isColliding(): boolean {
    return this.hitsWall() || this.hitsSelf();
  }

  private hitsWall(): boolean {
    const head = this.head;
    return head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT;
  }

  private hitsSelf(): boolean {
    const head = this.head;

    for (let i = 1; i < this.segments.length; i++) {
      if (pointsEqual(head, this.segments[i])) {
        return true;
      }
    }

    return false;
  }

  private startAtCenter(): void {
    const startX = Math.floor(GRID_WIDTH / 2);
    const startY = Math.floor(GRID_HEIGHT / 2);

    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      const segment: Point = {
        x: startX,
        y: startY,
      };

      switch (this.direction) {
        case Direction.Up:
          segment.y += i;
          break;

        case Direction.Down:
          segment.y -= i;
          break;

        case Direction.Left:
          segment.x += i;
          break;

        case Direction.Right:
          segment.x -= i;
          break;
      }
      this.segments.push(segment);
    }
  }

  private getRandomDirection(): Direction {
    const directions = [Direction.Up, Direction.Down, Direction.Left, Direction.Right];
    const index = Math.floor(Math.random() * directions.length);
    return directions[index];
  }

  private getNextHeadPosition(direction = this.queuedDirection): Point {
    const next: Point = {
      x: this.head.x,
      y: this.head.y,
    };

    switch (direction) {
      case Direction.Up:
        next.y--;
        break;
      case Direction.Down:
        next.y++;
        break;
      case Direction.Left:
        next.x--;
        break;
      case Direction.Right:
        next.x++;
        break;
    }
    return next;
  }
}
