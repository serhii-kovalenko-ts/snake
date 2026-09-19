import { ImageName, IMAGE_URLS } from "../misc/types/assets-types";
import { SOUND_URLS, type SoundName } from "../misc/types/sound-types";

export class LoadManager {
  private images = new Map<ImageName, HTMLImageElement>();
  private sounds = new Map<SoundName, HTMLAudioElement>();

  public async loadAssets(): Promise<void> {
    await Promise.all([this.loadImages(), this.loadSounds()]);
  }

  public getImages(): Map<ImageName, HTMLImageElement> {
    return this.images;
  }

  public getSounds(): Map<SoundName, HTMLAudioElement> {
    return this.sounds;
  }

  private async loadImages(): Promise<void> {
    const entries = Object.entries(IMAGE_URLS) as [ImageName, string][];

    await Promise.all(
      entries.map(async ([name, src]) => {
        const image = await this.loadImage(src);
        this.images.set(name, image);
      }),
    );
  }

  private async loadSounds(): Promise<void> {
    const entries = Object.entries(SOUND_URLS) as [SoundName, string][];

    await Promise.all(
      entries.map(async ([name, src]) => {
        const sound = await this.loadSound(src);
        this.sounds.set(name, sound);
      }),
    );
  }

  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => {
        reject(new Error(`Failed to load image: ${src}`));
      };
      image.src = src;
    });
  }

  private loadSound(src: string): Promise<HTMLAudioElement> {
    return new Promise((resolve, reject) => {
      const audio = new Audio();

      const cleanup = (): void => {
        audio.removeEventListener("canplaythrough", onLoaded);
        audio.removeEventListener("error", onError);
      };

      const onLoaded = (): void => {
        cleanup();
        resolve(audio);
      };

      const onError = (): void => {
        cleanup();
        reject(new Error(`Failed to load sound: ${src}`));
      };

      audio.addEventListener("canplaythrough", onLoaded, { once: true });
      audio.addEventListener("error", onError, { once: true });
      audio.preload = "auto";
      audio.src = src;
      audio.load();
    });
  }
}
