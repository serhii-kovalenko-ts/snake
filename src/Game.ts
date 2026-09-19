import { Food } from "./components/Food";
import { Snake } from "./components/Snake";
import { MOVE_INTERVAL_MS, SCORE_PER_FOOD, EXIT_URL } from "./config/game-config";
import { GameState } from "./config/game-states";
import { Ads } from "./misc/interfaces/ads-interface";
import { IGame } from "./misc/interfaces/game-interface";
import { Input } from "./misc/interfaces/input-interface";
import { Renderer } from "./misc/interfaces/renderer-interface";
import { Sound } from "./misc/interfaces/sound-interface";
import { ACTION_TO_DIRECTION } from "./misc/types/direction-types";
import { GameAction } from "./misc/types/input-types";
import { SoundName } from "./misc/types/sound-types";
import { GameLoopService } from "./services/GameLoopService";

export class Game {
  private state = GameState.MENU;
  private score = 0;
  private isStarting = false;

  private snake = new Snake();
  private food = new Food();
  private renderer: Renderer;
  private input: Input;
  private sound: Sound;
  private ads: Ads;
  private loop: GameLoopService;

  constructor({ renderer, input, sound, ads }: IGame) {
    this.renderer = renderer;
    this.input = input;
    this.sound = sound;
    this.ads = ads;
    this.input.setActionHandler(this.handleAction);
    this.loop = new GameLoopService(MOVE_INTERVAL_MS, this.shouldUpdate, this.update, this.render);

    this.relocateFood();
  }

  public start(): void {
    this.loop.start();
  }

  public destroy(): void {
    this.loop.stop();
    this.input.destroy();
    this.ads.destroy();
  }

  private handleAction = (action: GameAction): void => {
    if (action === "confirm" && this.state !== GameState.PLAYING) {
      void this.startNewGame();
      return;
    }

    if (action === "exit" && this.state !== GameState.PLAYING) {
      this.exit();
      return;
    }

    if (this.state !== GameState.PLAYING) {
      return;
    }

    const direction = ACTION_TO_DIRECTION[action];
    if (direction !== undefined) {
      this.snake.queueDirection(direction);
    }
  };

  private shouldUpdate = (): boolean => {
    return this.state === GameState.PLAYING;
  };

  private update = (): void => {
    // Check next cell
    const ateFood = this.snake.willMoveTo(this.food.position);
    this.snake.move(ateFood);
    if (this.snake.isColliding()) {
      this.sound.play(SoundName.GAME_OVER);
      this.state = GameState.GAME_OVER;
      return;
    }

    if (ateFood) {
      this.sound.play(SoundName.EAT);
      this.score += SCORE_PER_FOOD;
      this.relocateFood();
    }
  };

  private render = (): void => {
    this.renderer.render({
      state: this.state,
      snake: this.snake.body,
      food: this.food.position,
      score: this.score,
    });
  };

  private async startNewGame(): Promise<void> {
    if (this.isStarting) {
      return;
    }

    this.isStarting = true;
    this.sound.play(SoundName.SELECT);

    try {
      await this.ads.show();
      this.resetGame();
    } finally {
      this.isStarting = false;
    }
  }

  private resetGame(): void {
    this.snake.reset();
    this.score = 0;
    this.relocateFood();
    this.state = GameState.PLAYING;
    this.loop.resetTiming();
  }

  private relocateFood(): void {
    this.food.relocate(this.snake.body);
  }

  private exit(): void {
    window.location.assign(EXIT_URL);
  }
}
