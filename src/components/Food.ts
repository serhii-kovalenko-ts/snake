import { GRID_HEIGHT, GRID_WIDTH } from "../config/game-config";
import type { Point } from "../misc/types/point-types";

export class Food {
  public position: Point = {
    x: 0,
    y: 0,
  };

  public relocate(occupied: Point[]): boolean {
    // Create cell map
    const cells = new Array<boolean>(GRID_WIDTH * GRID_HEIGHT).fill(false);
    let occupiedCount = 0;

    // Mark occupied cells
    for (const point of occupied) {
      if (point.x < 0 || point.x >= GRID_WIDTH || point.y < 0 || point.y >= GRID_HEIGHT) {
        continue;
      }

      // Convert to index
      const index = point.y * GRID_WIDTH + point.x;
      if (!cells[index]) {
        cells[index] = true;
        occupiedCount++;
      }
    }

    // Count free cells
    const freeCount = cells.length - occupiedCount;
    if (freeCount === 0) {
      return false;
    }

    // Pick free cell
    let target = Math.floor(Math.random() * freeCount);

    // Find target cell
    for (let index = 0; index < cells.length; index++) {
      if (cells[index]) {
        continue;
      }

      if (target === 0) {
        // Convert to position
        this.position.x = index % GRID_WIDTH;
        this.position.y = Math.floor(index / GRID_WIDTH);
        return true;
      }
      target--;
    }
    return false;
  }
}
