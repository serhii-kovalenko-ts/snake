import { Sound } from "../misc/interfaces/sound-interface";
import { SoundName } from "../misc/types/sound-types";

export class SoundManager implements Sound {
  constructor(private sounds: Map<SoundName, HTMLAudioElement>) {}

  public play(name: SoundName): void {
    const sound = this.sounds.get(name);
    if (!sound) {
      return;
    }
    sound.currentTime = 0;
    void sound.play();
  }

  public stop(name: SoundName): void {
    const sound = this.sounds.get(name);
    if (!sound) {
      return;
    }
    sound.pause();
    sound.currentTime = 0;
  }

  public stopAll(): void {
    for (const sound of this.sounds.values()) {
      sound.pause();
      sound.currentTime = 0;
    }
  }
}
