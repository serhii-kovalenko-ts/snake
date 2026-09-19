import type { Input } from "./input-interface";
import type { Renderer } from "./renderer-interface";
import type { Sound } from "./sound-interface";
import type { Ads } from "./ads-interface";

export interface IGame {
  renderer: Renderer;
  input: Input;
  sound: Sound;
  ads: Ads;
}
