export class GameLoopService {
  private rafId = 0;
  private running = false;
  private lastTimestamp = 0;
  private accumulator = 0;

  constructor(
    private moveIntervalMs: number,
    private shouldUpdate: () => boolean,
    private update: () => void,
    private render: () => void,
  ) {}

  public start(): void {
    if (this.running) {
      return;
    }

    this.running = true;
    this.lastTimestamp = 0;
    this.accumulator = 0;
    this.rafId = requestAnimationFrame(this.frame);
  }

  public stop(): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
    this.rafId = 0;
  }

  public resetTiming(): void {
    this.accumulator = 0;
    this.lastTimestamp = 0;
  }

  private frame = (timestamp: number): void => {
    if (!this.running) {
      return;
    }

    // Initialize timing
    if (this.lastTimestamp === 0) {
      this.lastTimestamp = timestamp;
    }

    // Calculate frame time
    const delta = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    if (this.shouldUpdate()) {
      // Accumulate elapsed time
      this.accumulator += delta;

      // Handle long frame delays
      const maxCatchUp = this.moveIntervalMs * 2;
      if (this.accumulator > maxCatchUp) {
        this.accumulator = this.moveIntervalMs;
      }

      while (this.accumulator >= this.moveIntervalMs) {
        this.update();
        this.accumulator -= this.moveIntervalMs;
      }
    }

    this.render();
    this.rafId = requestAnimationFrame(this.frame);
  };
}
