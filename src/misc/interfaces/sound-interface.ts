import { SoundName } from "../types/sound-types";

export interface Sound {
  play(name: SoundName): void;
  stop(name: SoundName): void;
  stopAll(): void;
}
