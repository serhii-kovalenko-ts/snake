import { CANVAS_HEIGHT, CANVAS_WIDTH, CELL_SIZE } from "../config/game-config";
import { GameState } from "../config/game-states";
import { COLORS, PANEL_STYLE, SCORE_STYLE } from "../config/render-config";
import { getText } from "../helpers/LocalizationHelper";
import { getSnakeSprite } from "../helpers/SnakeSpriteHelper";
import type { IRenderView, Renderer } from "../misc/interfaces/renderer-interface";
import { ImageName, type SpriteName } from "../misc/types/assets-types";
import type { Point } from "../misc/types/point-types";

export class CanvasRenderer implements Renderer {
  private ctx: CanvasRenderingContext2D;
  private fieldLayer: HTMLCanvasElement;

  constructor(
    canvas: HTMLCanvasElement,
    private sprites: Map<ImageName, HTMLImageElement>,
  ) {
    this.ctx = this.getContext(canvas);
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // Cache static field
    this.fieldLayer = this.createFieldLayer();
  }

  public render(view: IRenderView): void {
    this.clear();

    if (view.state === GameState.MENU) {
      this.drawMenu();
      return;
    }

    this.drawFood(view.food);
    this.drawSnake(view.snake);
    this.drawScore(view.score);

    if (view.state === GameState.GAME_OVER) {
      this.drawGameOver(view.score);
    }
  }

  private createFieldLayer(): HTMLCanvasElement {
    const layer = document.createElement("canvas");
    layer.width = CANVAS_WIDTH;
    layer.height = CANVAS_HEIGHT;

    const ctx = this.getContext(layer);
    this.drawFieldBackground(ctx);
    this.drawGrid(ctx);

    return layer;
  }

  private drawFieldBackground(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  private drawGrid(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1;
    ctx.beginPath();

    for (let x = CELL_SIZE; x < CANVAS_WIDTH; x += CELL_SIZE) {
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, CANVAS_HEIGHT);
    }

    for (let y = CELL_SIZE; y < CANVAS_HEIGHT; y += CELL_SIZE) {
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(CANVAS_WIDTH, y + 0.5);
    }
    ctx.stroke();
  }

  private clear(): void {
    this.ctx.drawImage(this.fieldLayer, 0, 0);
  }

  private drawSnake(snake: Point[]): void {
    // Draw tail first
    for (let i = snake.length - 1; i >= 0; i--) {
      this.drawSprite(getSnakeSprite(snake, i), snake[i]);
    }
  }

  private drawFood(food: Point): void {
    this.drawSprite(ImageName.APPLE, food);
  }

  private drawSprite(name: SpriteName, point: Point): void {
    const sprite = this.sprites.get(name);
    if (!sprite) {
      throw new Error(`Sprite is not loaded: ${name}`);
    }
    this.ctx.drawImage(sprite, point.x * CELL_SIZE, point.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }

  private drawScore(score: number): void {
    this.ctx.fillStyle = COLORS.score;
    this.ctx.font = SCORE_STYLE.font;
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "top";
    this.ctx.fillText(getText("SCORE", { score }), SCORE_STYLE.x, SCORE_STYLE.y);
  }

  private drawMenu(): void {
    const lines = [getText("START"), getText("EXIT")];
    this.drawCenteredPanel(getText("GAME_NAME"), lines);
  }

  private drawGameOver(score: number): void {
    const lines = [getText("SCORE", { score }), "", getText("PLAY_AGAIN"), getText("EXIT")];
    this.drawCenteredPanel(getText("GAME_OVER"), lines);
  }

  private drawCenteredPanel(title: string, lines: string[]): void {
    const centerX = CANVAS_WIDTH / 2;
    const centerY = CANVAS_HEIGHT / 2;

    this.ctx.fillStyle = COLORS.overlay;
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = COLORS.title;
    this.ctx.font = PANEL_STYLE.titleFont;
    this.ctx.fillText(title, centerX, centerY - PANEL_STYLE.titleOffsetY);
    this.ctx.fillStyle = COLORS.muted;
    this.ctx.font = PANEL_STYLE.textFont;

    let offsetY = centerY - PANEL_STYLE.textOffsetY;

    for (const line of lines) {
      this.ctx.fillText(line, centerX, offsetY);
      offsetY += PANEL_STYLE.lineHeight;
    }
  }

  private getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    const context = canvas.getContext("2d", {
      alpha: false,
    });
    if (context === null) {
      throw new Error("Canvas 2D is not available.");
    }
    return context;
  }
}
