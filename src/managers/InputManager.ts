import type { Input } from "../misc/interfaces/input-interface";
import { KEY_TO_ACTION, type GameActionHandler } from "../misc/types/input-types";

export class InputManager implements Input {
  private onAction: GameActionHandler | null = null;

  private onKeyDown = (event: KeyboardEvent): void => {
    const action = KEY_TO_ACTION[event.key];
    if (action === undefined) {
      return;
    }
    event.preventDefault();
    this.onAction?.(action);
  };

  constructor() {
    this.create();
  }

  private create(): void {
    window.addEventListener("keydown", this.onKeyDown);
  }

  public setActionHandler(handler: GameActionHandler): void {
    this.onAction = handler;
  }

  public destroy(): void {
    window.removeEventListener("keydown", this.onKeyDown);
    this.onAction = null;
  }
}
