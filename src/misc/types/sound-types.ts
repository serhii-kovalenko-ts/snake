import eatUrl from "../../assets/audio/eat.ogg";
import gameOverUrl from "../../assets/audio/game-over.ogg";
import selectUrl from "../../assets/audio/select.ogg";

export const SoundName = {
  EAT: "eat",
  GAME_OVER: "gameOver",
  SELECT: "select",
} as const;

export type SoundName = (typeof SoundName)[keyof typeof SoundName];

export const SOUND_URLS: Record<SoundName, string> = {
  [SoundName.EAT]: eatUrl,
  [SoundName.GAME_OVER]: gameOverUrl,
  [SoundName.SELECT]: selectUrl,
};
