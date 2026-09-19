import { Game } from "./Game";
import { AdsManager } from "./managers/AdsManager";
import { InputManager } from "./managers/InputManager";
import { LoadManager } from "./managers/LoadManager";
import { SoundManager } from "./managers/SoundManager";
import { CanvasRenderer } from "./render/CanvasRenderer";

async function init(): Promise<void> {
  const canvas = document.querySelector<HTMLCanvasElement>("#game");
  const adContainer = document.querySelector<HTMLElement>("#ad-container");

  if (!canvas) {
    throw new Error("Game canvas was not found.");
  }

  if (!adContainer) {
    throw new Error("Ad container was not found.");
  }

  const loadManager = new LoadManager();
  await loadManager.loadAssets();

  const renderer = new CanvasRenderer(canvas, loadManager.getImages());
  const sound = new SoundManager(loadManager.getSounds());
  const input = new InputManager();
  const ads = new AdsManager(adContainer);

  const game = new Game({
    renderer,
    input,
    sound,
    ads,
  });

  game.start();
}

void init();
